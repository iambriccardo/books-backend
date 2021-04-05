import { User } from '../../entities/user';
import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const getSoldBooksUseCase = (user: User): Lazy<Promise<Book[]>> => {
    return async () => {
        return BookModel.find({
            seller: user.username,
            buyer: { $exists: true },
            saleDate: { $exists: true },
        });
    };
};
