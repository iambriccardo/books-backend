import { Middleware } from './base';
import { getUserFromRequest, IControllerRequest } from '../controllers/base';

export const injectIntoRequestBodyMiddleware = <E>(
    fieldName: string,
    fieldValue: E,
): Middleware<IControllerRequest> => {
    return (request: IControllerRequest): IControllerRequest => {
        return {
            ...request,
            body: {
                ...request.body,
                [fieldName]: fieldValue,
            },
        };
    };
};

export const injectUserIntoRequestBodyMiddleware = (
    fieldName: string,
): Middleware<IControllerRequest> => {
    return (request: IControllerRequest): IControllerRequest => {
        return injectIntoRequestBodyMiddleware(
            fieldName,
            getUserFromRequest(request).username,
        )(request);
    };
};
