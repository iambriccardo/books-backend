import { Lazy } from 'fp-ts/function';
import { User, UserModel } from '../../../entities/user';

export const signupUseCase = (user: User): Lazy<Promise<void>> => {
    return async () => {
        console.log('Signing up');
        await new UserModel(user).save();
    };
};
