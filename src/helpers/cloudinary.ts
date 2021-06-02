import cloudinary, { UploadApiResponse } from 'cloudinary';
import { GenericObject } from './types';
import { APP_NAME } from './environment';
import {
    CloudinaryError,
    ServerError,
    UnsupportedMediaTypeError,
} from '../errors/base';
import { supportedTypes } from './multer';

/**
 * For documentation look here [https://cloudinary.com/documentation/cloudinary_references].
 */

export interface UploadResult {
    publicId: string;
    url: string;
    secureUrl: string;
}

export const publicIdFromUrl = (url?: string): string => {
    if (!url)
        throw new ServerError(
            `Error while extracting public_id from an empty url.`,
        );

    const regex = new RegExp(`${APP_NAME}\\/(?:v\\d+\\/)?([^\\.]+)`);
    const matches = regex.exec(url as string);

    if (!matches)
        throw new ServerError(
            `Error while extracting public_id from url ${url}`,
        );

    return matches[0];
};

export const upload = async (
    base64Image: string,
    options?: GenericObject,
): Promise<UploadApiResponse> => {
    try {
        return await cloudinary.v2.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            {
                folder: APP_NAME,
                ...options,
            },
        );
    } catch (err) {
        if (err.message == 'Invalid image file')
            throw new UnsupportedMediaTypeError(supportedTypes);

        throw new CloudinaryError(err.message);
    }
};

export const destroy = async (publicId: string): Promise<any> => {
    try {
        return await cloudinary.v2.uploader.destroy(publicId);
    } catch (err) {
        throw new CloudinaryError(err.message);
    }
};

export const imageOptions = {
    profilePicture: {
        width: 500,
        height: 500,
        crop: 'fill',
    },
    bookPicture: {
        // TODO: investigate best settings for book pictures.
    },
};
