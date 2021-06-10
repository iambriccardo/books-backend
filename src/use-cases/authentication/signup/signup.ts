import { Lazy } from 'fp-ts/function';
import { User, UserModel } from '../../../entities/user';
import { SignupBody } from '../../../controllers/authentication/signup';
import {
    EmailAlreadyExistsError,
    UserAlreadyExistsError,
} from '../../../errors/base';

export const signupUseCase = (body: SignupBody): Lazy<Promise<void>> => {
    return async () => {
        const foundUser: User = await UserModel.findOne({
            $or: [{ username: body.username }, { email: body.email }],
        }).lean();
        if (foundUser) {
            if (foundUser.username === body.username)
                throw new UserAlreadyExistsError(foundUser.username);
            else if (foundUser.email === body.email)
                throw new EmailAlreadyExistsError(foundUser.email);
        }

        await new UserModel(body).save();
    };
};
