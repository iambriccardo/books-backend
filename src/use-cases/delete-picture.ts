import { Lazy } from 'fp-ts/function';
import { destroy } from '../helpers/cloudinary';
import { GenericObject } from '../helpers/types';

export const deletePictureUseCase = (
    publicId: string,
): Lazy<Promise<GenericObject>> => {
    return async () => {
        await destroy(publicId);

        return {};
    };
};
