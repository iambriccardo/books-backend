import { Lazy } from 'fp-ts/function';
import { User } from '../../../entities/user';
import validator from 'validator';
import { check } from '../../../helpers/validation';

export const validateSignupUseCase = (user: User): Lazy<Promise<User>> => {
    return async () => {
        console.log('Validating signup');
        check('password', user.password, (value) =>
            validator.isLength(value, { min: 1, max: 128 }),
        );

        check('email', user.contactInformation.email, (value) =>
            validator.isEmail(value),
        );

        return user;
    };
};
