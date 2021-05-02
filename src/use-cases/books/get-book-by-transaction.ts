import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';
import { TransactionModel } from '../../entities/transaction';

export const getBookByTransactionUseCase = (
    transactionId: string,
): Lazy<Promise<Book>> => {
    return async () => {
        const transaction = await TransactionModel.findOne({
            transactionId,
        }).lean();
        if (!transaction)
            throw new Error(
                'The book cannot be fetched because the transaction is invalid.',
            );

        const book = await BookModel.findOne({ bookId: transaction.bookId });
        if (!book)
            throw new Error(
                'The book linked to this transaction does not exist.',
            );

        return book;
    };
};
