import { Lazy } from 'fp-ts/function';
import { CheckAccountBody } from '../../controllers/authentication/check-account';
import { UserModel } from '../../entities/user';
import { UserNotFoundError } from '../../errors/base';
import { GenericObject } from '../../helpers/types';

export const checkAccountUseCase = (
    body: CheckAccountBody,
): Lazy<Promise<GenericObject>> => {
    return async () => {
        const user = await UserModel.findOne({
            $or: [
                { username: body.usernameOrEmail },
                { 'contactInformation.email': body.usernameOrEmail },
            ],
        });
        if (!user) throw new UserNotFoundError(body.usernameOrEmail);

        return {};
    };
};
