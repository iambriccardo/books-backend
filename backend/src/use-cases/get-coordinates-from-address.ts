import { Lazy } from 'fp-ts/function';
import { getCoordinatesFromAddress } from '../helpers/gcp';

export const getCoordinatesFromAddressUseCase = (
    address: string,
): Lazy<Promise<[number, number]>> => {
    return async () => {
        const { latitude, longitude } = await getCoordinatesFromAddress(
            address,
        );
        return [latitude, longitude];
    };
};
