import { Lazy } from 'fp-ts/function';
import { User } from '../../../entities/user';

export const sanitizeSignupUseCase = (user: User): Lazy<Promise<User>> => {
    return async () => {
        return user;
    };
};
