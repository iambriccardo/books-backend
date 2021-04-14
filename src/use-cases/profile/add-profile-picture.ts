import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';
import { GenericObject } from '../../helpers/types';
import { UploadResult } from '../../helpers/cloudinary';

export const addProfilePictureUseCase = (
    username: string,
    uploadResult: UploadResult,
): Lazy<Promise<GenericObject>> => {
    return async () => {
        await UserModel.updateOne(
            { username: username },
            { $set: { profilePicture: uploadResult.url } },
        );

        return {
            url: uploadResult.url,
        };
    };
};
