import { Lazy } from 'fp-ts/function';
import { User } from '../../../entities/user';
import validator from 'validator';
import { check, optionalCheck } from '../../../helpers/validation';

export const validateSignupUseCase = (user: User): Lazy<Promise<User>> => {
    return async () => {
        check(
            'password',
            (value) => validator.isLength(value, { min: 1, max: 128 }),
            user.password,
        );

        check(
            'email',
            (value) => validator.isEmail(value),
            user.contactInformation.email,
        );

        optionalCheck(
            'profilePicture',
            (value) => validator.isURL(value),
            user.profilePicture,
        );

        return user;
    };
};
