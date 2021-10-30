import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import { SignupBody } from '../../../controllers/authentication/signup';

export const sanitizeSignupUseCase = (
    body: SignupBody,
): Lazy<Promise<SignupBody>> => {
    return async () => {
        return {
            email: validator.normalizeEmail(
                validator.trim(body.email),
            ) as string,
            username: validator.trim(body.username),
            password: validator.trim(body.password),
        };
    };
};
