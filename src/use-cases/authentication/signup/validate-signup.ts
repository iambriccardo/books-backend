import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import { check } from '../../../helpers/validation';
import { SignupBody } from '../../../controllers/authentication/signup';

export const validateSignupUseCase = (
    body: SignupBody,
): Lazy<Promise<SignupBody>> => {
    return async () => {
        check('email', (value) => validator.isEmail(value), body.email);

        check(
            'password',
            (value) => validator.isLength(value, { min: 1, max: 128 }),
            body.password,
        );

        return body;
    };
};
