import { Lazy } from 'fp-ts/function';
import { destroy, UploadResult } from '../helpers/cloudinary';
import { ServerError } from '../errors/base';

export const deletePictureUseCase = (
    publicId: string,
): Lazy<Promise<UploadResult>> => {
    return async () => {
        await destroy(publicId);

        throw new ServerError(
            'A problem occurred while setting the profile picture.',
        );
    };
};
