import { BaseUser } from '../../entities/user';
import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const getSellingBooksUseCase = (
    user: BaseUser,
): Lazy<Promise<Book[]>> => {
    return async () => {
        return BookModel.find({
            seller: user.username,
            buyer: { $exists: false },
            saleDate: { $exists: false },
        }).lean();
    };
};
