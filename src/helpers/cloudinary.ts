import cloudinary, { UploadApiResponse } from 'cloudinary';
import { GenericObject } from './types';
import { APP_NAME } from './environment';

/**
 * For documentation look here [https://cloudinary.com/documentation/cloudinary_references].
 */

export const upload = async (
    base64Image: string,
    options?: GenericObject,
): Promise<UploadApiResponse> => {
    return await cloudinary.v2.uploader.upload(
        `data:image/png;base64,${base64Image}`,
        {
            folder: APP_NAME,
            ...options,
        },
    );
};
