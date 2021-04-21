import { GCP_API_KEY } from './environment';
import got from 'got';

export interface GCPCoordinates {
    latitude: number;
    longitude: number;
}

export const getCoordinatesFromAddress = async (
    address: string,
): Promise<GCPCoordinates> => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${GCP_API_KEY}&address=${address}`;

    const response = await got(url);
    const jsonBody = JSON.parse(response.body);
    const location = jsonBody.results[0].geometry.location;

    return {
        latitude: location.lat,
        longitude: location.lng,
    };
};
