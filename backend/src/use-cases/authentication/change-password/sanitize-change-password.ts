import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import { ChangePasswordBody } from '../../../controllers/authentication/change-password';

export const sanitizeChangePasswordUseCase = (
    body: ChangePasswordBody,
): Lazy<Promise<ChangePasswordBody>> => {
    return async () => {
        return {
            oldPassword: validator.trim(body.oldPassword),
            newPassword: validator.trim(body.newPassword),
        };
    };
};
