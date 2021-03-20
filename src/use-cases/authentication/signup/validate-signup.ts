import { Lazy } from 'fp-ts/function';
import { UserDocument } from '../../../entities/user';

export const validateSignupUseCase = (
    user: UserDocument,
): Lazy<Promise<UserDocument>> => {
    return async () => {
        console.log('Validating signup');
        return user;
    };
};
