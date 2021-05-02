import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const getSoldBooksUseCase = (seller: string): Lazy<Promise<Book[]>> => {
    return async () => {
        return BookModel.find({
            seller: seller,
            buyer: { $exists: true },
            saleDate: { $exists: true },
        }).lean();
    };
};
