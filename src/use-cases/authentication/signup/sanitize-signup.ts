import { Lazy } from 'fp-ts/function';
import { UserDocument } from '../../../entities/user';

export const sanitizeSignupUseCase = (
    user: UserDocument,
): Lazy<Promise<UserDocument>> => {
    return async () => {
        console.log('Sanitizing signup');
        return user;
    };
};
