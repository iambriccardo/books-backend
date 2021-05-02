import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const getSellingBooksUseCase = (
    seller: string,
): Lazy<Promise<Book[]>> => {
    return async () => {
        return BookModel.find({
            seller: seller,
            buyer: { $exists: false },
            saleDate: { $exists: false },
        }).lean();
    };
};
