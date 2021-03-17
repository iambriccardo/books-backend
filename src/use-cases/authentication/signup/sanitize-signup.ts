import { Lazy } from 'fp-ts/function';
import { IUser } from '../../../entities/user';

export const sanitizeSignupUseCase = (user: IUser): Lazy<Promise<IUser>> => {
    return async () => {
        console.log('sanitizing signup');
        return user;
    };
};
