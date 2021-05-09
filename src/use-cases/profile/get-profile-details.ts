import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';
import { UserNotFoundError } from '../../errors/base';
import { GenericObject } from '../../helpers/types';

export const getProfileDetailsUseCase = (
    userId: string,
): Lazy<Promise<GenericObject>> => {
    return async () => {
        const user = await UserModel.findOne(
            { userId },
            { password: 0 },
        ).lean();

        if (user == null) throw new UserNotFoundError(userId);

        return user;
    };
};
