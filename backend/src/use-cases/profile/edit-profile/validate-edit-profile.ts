import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import { optionalCheck } from '../../../helpers/validation';
import { EditProfileBody } from '../../../controllers/profile/edit-profile';

export const validateEditProfileUseCase = (
    body: EditProfileBody,
): Lazy<Promise<EditProfileBody>> => {
    return async () => {
        optionalCheck('email', (email) => validator.isEmail(email), body.email);

        return body;
    };
};
