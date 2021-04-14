import { Lazy } from 'fp-ts/function';
import { upload } from '../../helpers/cloudinary';
import { GenericObject } from '../../helpers/types';

export const uploadProfilePictureUseCase = (
    base64File: string,
): Lazy<Promise<GenericObject>> => {
    return async () => {
        const profileImageSize = {
            width: 500,
            height: 500,
        };

        const result = await upload(base64File, {
            ...profileImageSize,
            crop: 'fill',
        });

        return {
            public_id: result.public_id,
            url: result.url,
            secure_url: result.secure_url,
        };
    };
};
