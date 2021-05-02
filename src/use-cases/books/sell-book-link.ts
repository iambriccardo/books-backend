import { Lazy } from 'fp-ts/function';
import { Transaction } from '../../entities/transaction';
import { GenericObject } from '../../helpers/types';

export const sellBookLinkUseCase = (
    baseUrl: string,
    transaction: Transaction,
): Lazy<Promise<GenericObject>> => {
    return async () => {
        if (!transaction || !transaction.transactionId)
            throw new Error(
                'The sell link cannot be generated because the transaction is invalid.',
            );

        return {
            link: `${baseUrl}/${transaction.transactionId}`,
        };
    };
};
