import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';
import { shuffle } from '../../helpers/utils';

export const shuffleBooksUseCase = (
    seller: string,
    limit = 10,
): Lazy<Promise<Book[]>> => {
    return async () => {
        const books = await BookModel.find({
            seller: { $ne: seller },
            buyer: { $exists: false },
            saleDate: { $exists: false },
        })
            .limit(limit)
            .lean();

        return shuffle(books);
    };
};
