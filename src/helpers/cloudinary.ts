import cloudinary, { UploadApiResponse } from 'cloudinary';
import { GenericObject } from './types';
import { APP_NAME } from './environment';
import { CloudinaryUploadError, UnsupportedMediaType } from '../errors/base';
import { supportedTypes } from './multer';

/**
 * For documentation look here [https://cloudinary.com/documentation/cloudinary_references].
 */

export interface UploadResult {
    publicId: string;
    url: string;
    secureUrl: string;
}

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
            throw new UnsupportedMediaType(supportedTypes);

        throw new CloudinaryUploadError(err.message);
    }
};

export const destroy = async (publicId: string): Promise<any> => {
    return await cloudinary.v2.uploader.destroy(publicId);
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
