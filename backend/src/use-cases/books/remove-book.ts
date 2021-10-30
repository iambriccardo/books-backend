import { Lazy } from 'fp-ts/function';
import { BookModel } from '../../entities/book';
import { TransactionModel } from '../../entities/transaction';

export const removeBookUseCase = (
    seller: string,
    bookId: string,
): Lazy<Promise<void>> => {
    return async () => {
        await TransactionModel.deleteMany({ bookId });
        await BookModel.deleteOne({ bookId, seller });
    };
};
