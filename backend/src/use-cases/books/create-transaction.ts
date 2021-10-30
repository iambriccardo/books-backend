import { Lazy } from 'fp-ts/function';
import { Transaction, TransactionModel } from '../../entities/transaction';
import { BookModel } from '../../entities/book';

export const createTransactionUseCase = (
    bookId: string,
): Lazy<Promise<Transaction>> => {
    return async () => {
        const book = await BookModel.findOne({
            bookId,
            buyer: { $exists: false },
            saleDate: { $exists: false },
        }).lean();
        if (!book)
            throw new Error(
                `Cannot create transaction because book ${bookId} has not been found or it is sold.`,
            );

        return new TransactionModel({ bookId }).save();
    };
};
