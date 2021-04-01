import { User } from '../../entities/user';
import { Lazy } from 'fp-ts/function';
import { Book } from '../../entities/book';

export const getRecentlyViewedBooksUseCase = (
    user: User,
): Lazy<Promise<Book[]>> => {
    return async () => {
        return [];
    };
};
