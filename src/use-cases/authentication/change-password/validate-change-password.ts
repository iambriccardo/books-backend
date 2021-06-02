import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import { check } from '../../../helpers/validation';
import { ChangePasswordBody } from '../../../controllers/authentication/change-password';
import { UserModel } from '../../../entities/user';
import {
    PasswordsEqualError,
    PasswordsNotMatchingError,
    UserNotFoundError,
} from '../../../errors/base';

export const validateChangePasswordUseCase = (
    userId: string,
    body: ChangePasswordBody,
): Lazy<Promise<ChangePasswordBody>> => {
    return async () => {
        const existingUser = await UserModel.findOne({ userId });
        if (!existingUser) throw new UserNotFoundError(userId);

        if (!existingUser.comparePasswordSync(body.oldPassword))
            throw new PasswordsNotMatchingError();

        if (existingUser.comparePasswordSync(body.newPassword))
            throw new PasswordsEqualError();

        check(
            'newPassword',
            (password) => validator.isLength(password, { min: 7, max: 128 }),
            body.newPassword,
        );

        return body;
    };
};
