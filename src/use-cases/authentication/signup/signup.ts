import { Lazy } from 'fp-ts/function';
import { UserDocument, UserModel } from '../../../entities/user';

export const signupUseCase = (user: UserDocument): Lazy<Promise<void>> => {
    return async () => {
        await new UserModel(user).save();
    };
};
