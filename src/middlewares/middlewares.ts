import { Middleware } from './base';
import { IControllerRequest } from '../controllers/base';
import { getUserFromRequestUseCase } from '../use-cases/get-user-from-request';

export const useInjectIntoRequestBody = <E>(
    fieldName: string,
    fieldValue: E,
): Middleware<IControllerRequest> => {
    return async (request: IControllerRequest) => {
        return {
            ...request,
            body: {
                ...request.body,
                [fieldName]: fieldValue,
            },
        };
    };
};

export const useInjectUserIntoRequestBody = (
    fieldName: string,
): Middleware<IControllerRequest> => {
    return async (request: IControllerRequest) => {
        const user = await getUserFromRequestUseCase(request)();
        return useInjectIntoRequestBody(fieldName, user.username)(request);
    };
};
