import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';
import { UserNotFoundError } from '../../errors/base';
import { GenericObject } from '../../helpers/types';

export const checkAccountUseCase = (
    usernameOrEmail: string,
): Lazy<Promise<GenericObject>> => {
    return async () => {
        const user = await UserModel.findOne({
            $or: [
                { username: usernameOrEmail },
                { 'contactInformation.email': usernameOrEmail },
            ],
        });
        if (!user) throw new UserNotFoundError(usernameOrEmail);

        return {};
    };
};
