import cloudinary, { UploadApiResponse } from 'cloudinary';
import { GenericObject } from './types';
import { APP_NAME } from './environment';

/**
 * For documentation look here [https://cloudinary.com/documentation/cloudinary_references].
 */

export interface UploadResult {
    public_id: string;
    url: string;
    secure_url: string;
}

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

export const destroy = async (publicId: string): Promise<any> => {
    return await cloudinary.v2.uploader.destroy(publicId);
};

export const imageOptions = {
    profilePicture: {
        width: 500,
        height: 500,
        crop: 'fill',
    },
};
