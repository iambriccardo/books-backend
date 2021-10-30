import { Lazy } from 'fp-ts/function';
import { TransactionModel } from '../../entities/transaction';
import { BookModel } from '../../entities/book';

export const sellBookConfirmUseCase = (
    buyer: string,
    transactionId: string,
): Lazy<Promise<void>> => {
    return async () => {
        const transaction = await TransactionModel.findOne({
            transactionId,
        });
        if (!transaction || !transaction.transactionId)
            throw new Error(
                'Cannot confirm book sell because the transaction is invalid.',
            );

        const book = await BookModel.findOne({
            bookId: transaction.bookId,
        }).lean();
        if (!book)
            throw new Error(
                'Cannot confirm book sell because the book has not been found.',
            );

        if (buyer === book.seller)
            throw new Error(
                'The seller and the buyer of a book cannot be the same',
            );

        await BookModel.findOneAndUpdate(
            { bookId: transaction.bookId },
            {
                buyer,
                saleDate: new Date(),
            },
        );

        await transaction.delete();
    };
};
