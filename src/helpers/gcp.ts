import { GCP_API_KEY } from './environment';
import got from 'got';
import { GCPError } from '../errors/base';

export interface GCPCoordinates {
    latitude: number;
    longitude: number;
}

export const getCoordinatesFromAddress = async (
    address: string,
): Promise<GCPCoordinates> => {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${GCP_API_KEY}&address=${address}`;

        const response = await got(url);
        const jsonBody = JSON.parse(response.body);
        const results = jsonBody.results;
        if (results.length == 0)
            throw new Error('The place has not been found');

        const location = results[0].geometry.location;

        return {
            latitude: location.lat,
            longitude: location.lng,
        };
    } catch (error) {
        throw new GCPError(error);
    }
};
