import { Lazy } from 'fp-ts/function';
import { Transaction, TransactionModel } from '../../entities/transaction';

export const getTransactionUseCase = (
    bookId: string,
): Lazy<Promise<Transaction>> => {
    return async () => {
        const transaction = await TransactionModel.findOne({ bookId }).lean();
        if (!transaction)
            throw new Error(
                `Active transaction for book ${bookId} not existing.`,
            );

        return transaction;
    };
};
