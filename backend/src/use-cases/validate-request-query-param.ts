import { IControllerRequest } from '../controllers/base';
import { Lazy } from 'fp-ts/function';
import { InvalidParamError } from '../errors/base';

export const validateRequestQueryParam = (
    request: IControllerRequest,
    queryParam: string,
): Lazy<Promise<string>> => {
    return async () => {
        const paramValue = request.query[queryParam] as string;
        if (paramValue === undefined) throw new InvalidParamError(queryParam);

        return paramValue;
    };
};
