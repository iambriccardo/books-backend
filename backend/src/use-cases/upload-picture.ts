import { Lazy } from 'fp-ts/function';
import { upload, UploadResult } from '../helpers/cloudinary';
import { GenericObject } from '../helpers/types';

export const uploadPictureUseCase = (
    base64File: string,
    options: GenericObject,
): Lazy<Promise<UploadResult>> => {
    return async () => {
        const result = await upload(base64File, options);

        return {
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
        };
    };
};
