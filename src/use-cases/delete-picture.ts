import { Lazy } from 'fp-ts/function';
import { destroy, publicIdFromUrl } from '../helpers/cloudinary';

export const deletePictureUseCase = (
    publicId?: string,
): Lazy<Promise<void>> => {
    return async () => {
        await destroy(publicIdFromUrl(publicId));
    };
};
