import { Middleware } from './base';
import { IControllerRequest } from '../controllers/base';
import { getUserFromRequestUseCase } from '../use-cases/get-user-from-request';
import { getCoordinatesFromAddressUseCase } from '../use-cases/get-coordinates-from-address';
import { GenericObject } from '../helpers/types';

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

export const useInjectMultipleIntoRequestBody = (
    fields: GenericObject,
): Middleware<IControllerRequest> => {
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
): Middleware<IControllerRequest> => {
    return async (request: IControllerRequest) => {
        const user = await getUserFromRequestUseCase(request)();
        return await useInjectIntoRequestBody(
            fieldName,
            user.username,
        )(request);
    };
};

export const useInjectLocationCoordinatesIntoRequestBody = (): Middleware<IControllerRequest> => {
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
