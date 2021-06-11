import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';
import { GenericObject } from '../../helpers/types';

export const checkAccountUseCase = (
    usernameOrEmail: string,
): Lazy<Promise<GenericObject>> => {
    return async () => {
        const user = await UserModel.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });

        return user ? { username: user.username } : {};
    };
};
