import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const searchBooksUseCase = (
    searchQuery: string,
): Lazy<Promise<Book[]>> => {
    return async () => {
        return BookModel.find(
            { $text: { $search: searchQuery } },
            { score: { $meta: 'textScore' } },
        ).sort({ score: { $meta: 'textScore' } });
    };
};
