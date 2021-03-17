import { Lazy } from 'fp-ts/function';
import { IUserBase } from '../../../entities/user';

export const validateLoginUseCase = (
    user: IUserBase,
): Lazy<Promise<IUserBase>> => {
    return async () => {
        console.log('login');
        return user;
    };
};
