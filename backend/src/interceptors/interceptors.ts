import { Interceptor } from './base';
import { IControllerRequest } from '../controllers/base';
import { getUserFromRequestUseCase } from '../use-cases/get-user-from-request';
import { getCoordinatesFromAddressUseCase } from '../use-cases/get-coordinates-from-address';
import { GenericObject } from '../helpers/types';

export const useInjectIntoRequestBody = <E>(
    fieldName: string,
    fieldValue: E,
): Interceptor<IControllerRequest> => {
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

export const useInjectMultipleIntoRequestBody = (
    fields: GenericObject,
): Interceptor<IControllerRequest> => {
    return async (request: IControllerRequest) => {
        return {
            ...request,
            body: {
                ...request.body,
                ...fields,
            },
        };
    };
};

export const useInjectUserIntoRequestBody = (
    fieldName: string,
): Interceptor<IControllerRequest> => {
    return async (request: IControllerRequest) => {
        const user = await getUserFromRequestUseCase(request)();
        return await useInjectIntoRequestBody(fieldName, user.userId)(request);
    };
};

export const useInjectLocationCoordinatesIntoRequestBody = (): Interceptor<IControllerRequest> => {
    return async (request: IControllerRequest) => {
        const [latitude, longitude] = await getCoordinatesFromAddressUseCase(
            request.body.locationName,
        )();

        return useInjectMultipleIntoRequestBody({
            locationLatitude: latitude,
            locationLongitude: longitude,
        })(request);
    };
};

export const useInjectQueryParameter = (
    name: string,
    value: string,
): Interceptor<IControllerRequest> => {
    return async (request: IControllerRequest) => {
        request.query[name] = value;

        return {
            ...request,
        };
    };
};

export const useApplyFunctionToRequestBodyField = (
    fieldName: string,
    block: (fieldValue: string) => string,
): Interceptor<IControllerRequest> => {
    return async (request: IControllerRequest) => {
        return {
            ...request,
            body: {
                ...request.body,
                [fieldName]: block(request.body[fieldName]),
            },
        };
    };
};

export const useFieldValueToLowerCase = (
    fieldName: string,
): Interceptor<IControllerRequest> => {
    return useApplyFunctionToRequestBodyField(fieldName, (fieldValue) =>
        fieldValue.toLowerCase(),
    );
};
