import { IControllerRequest } from '../controllers/base';
import { Lazy } from 'fp-ts/function';
import { InvalidParamError } from '../errors/base';

export const validateRequestParamUseCase = (
    request: IControllerRequest,
    paramName: string,
): Lazy<Promise<string>> => {
    return async () => {
        const paramValue = request.params[paramName];
        if (paramValue === undefined) throw new InvalidParamError(paramName);

        return paramValue;
    };
};
