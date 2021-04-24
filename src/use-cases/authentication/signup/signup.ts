import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../../entities/user';
import { SignupBody } from '../../../controllers/authentication/signup';

export const signupUseCase = (body: SignupBody): Lazy<Promise<void>> => {
    return async () => {
        await new UserModel(body).save();
    };
};
