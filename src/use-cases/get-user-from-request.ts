import { User } from '../entities/user';
import { UnauthenticatedUserError } from '../errors/base';
import { IControllerRequest } from '../controllers/base';
import { Lazy } from 'fp-ts/function';

export const getUserFromRequestUseCase = (
    request: IControllerRequest,
): Lazy<Promise<User>> => {
    return async () => {
        const user = request.context.expressRequest.user;
        if (!user) throw new UnauthenticatedUserError();

        return user as User;
    };
};
