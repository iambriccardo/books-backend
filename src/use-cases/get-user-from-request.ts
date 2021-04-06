import { User } from '../entities/user';
import { UnauthenticatedUserError } from '../errors/base';
import { IControllerRequest } from '../controllers/base';
import { Lazy } from 'fp-ts/function';

export const getUserFromRequestUseCase: (
    request: IControllerRequest,
) => Lazy<Promise<User>> = (request: IControllerRequest) => {
    return async () => {
        if (request.context.expressRequest.user === undefined)
            throw new UnauthenticatedUserError();

        return request.context.expressRequest.user as User;
    };
};
