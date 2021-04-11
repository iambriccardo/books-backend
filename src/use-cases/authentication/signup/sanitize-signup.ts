import { Lazy } from 'fp-ts/function';
import { User } from '../../../entities/user';
import validator from 'validator';

export const sanitizeSignupUseCase = (user: User): Lazy<Promise<User>> => {
    return async () => {
        const sanitizedUser: User = {
            username: validator.trim(user.username),
            password: validator.trim(user.password),
            name: validator.trim(user.name),
            surname: validator.trim(user.surname),
            contactInformation: {
                phoneNumber: validator.trim(
                    user.contactInformation.phoneNumber,
                ),
                email: validator.normalizeEmail(
                    validator.trim(user.contactInformation.email),
                ) as string,
                telegramUsername: validator.trim(
                    user.contactInformation.telegramUsername || '',
                ),
                facebookUsername: validator.trim(
                    user.contactInformation.facebookUsername || '',
                ),
            },
            profilePicture: validator.trim(user.profilePicture || ''),
        };

        // TODO: explore a better implementation of this.
        if (sanitizedUser.contactInformation.telegramUsername == '') {
            delete sanitizedUser.contactInformation.telegramUsername;
        }

        if (sanitizedUser.contactInformation.facebookUsername == '') {
            delete sanitizedUser.contactInformation.facebookUsername;
        }

        if (sanitizedUser.profilePicture == '') {
            delete sanitizedUser.profilePicture;
        }

        return sanitizedUser;
    };
};
