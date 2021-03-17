import { Lazy } from 'fp-ts/function';
import { IUserBase } from '../../../entities/user';

export const loginUseCase = (user: IUserBase): Lazy<Promise<void>> => {
    return async () => {
        console.log('login');
    };
};
