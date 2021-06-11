import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import { check } from '../../../helpers/validation';
import { SignupBody } from '../../../controllers/authentication/signup';

export const validateSignupUseCase = (
    body: SignupBody,
): Lazy<Promise<SignupBody>> => {
    return async () => {
        check('email', (email) => validator.isEmail(email), body.email);

        check(
            'username',
            (username) => validator.isLength(username, { min: 3, max: 128 }),
            body.username,
        );

        check(
            'password',
            (password) => validator.isLength(password, { min: 7, max: 128 }),
            body.password,
        );

        return body;
    };
};
