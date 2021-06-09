import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const searchBooksUseCase = (
    searchQuery: string,
    limit: number,
    searcherUserId: string,
): Lazy<Promise<Book[]>> => {
    return async () => {
        return BookModel.find(
            {
                $or: [
                    { $text: { $search: searchQuery } },
                    { searchableIsbn: searchQuery },
                    { searchableTitle: searchQuery },
                ],
                seller: { $ne: searcherUserId },
                buyer: { $exists: false },
                saleDate: { $exists: false },
            },
            { score: { $meta: 'textScore' } },
        )
            .limit(limit)
            .sort({ score: { $meta: 'textScore' } })
            .lean();
    };
};
