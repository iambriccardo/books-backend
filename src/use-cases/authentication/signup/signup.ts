import { Lazy } from 'fp-ts/function';
import { IUser, User } from '../../../entities/user';

export const signupUseCase = (user: IUser): Lazy<Promise<void>> => {
    return async () => {
        const userModel = new User(user);
        await userModel.save();
    };
};
