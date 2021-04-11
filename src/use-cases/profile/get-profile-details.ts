import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';
import { UserNotFoundError } from '../../errors/base';

export const getProfileDetailsUseCase = (
    username: string,
): Lazy<Promise<Record<string, unknown>>> => {
    return async () => {
        const user = await UserModel.findOne(
            { username: username },
            { password: 0 },
        ).lean();

        if (user == null) throw new UserNotFoundError(username);

        return user;
    };
};
