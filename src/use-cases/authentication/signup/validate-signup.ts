import { Lazy } from 'fp-ts/function';
import { IUser } from '../../../entities/user';

export const validateSignupUseCase = (user: IUser): Lazy<Promise<IUser>> => {
    return async () => {
        console.log('validating signup');
        return user;
    };
};
