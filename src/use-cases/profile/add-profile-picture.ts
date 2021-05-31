import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';
import { UploadResult } from '../../helpers/cloudinary';

export const addProfilePictureUseCase = (
    username: string,
    uploadResult: UploadResult,
): Lazy<Promise<UploadResult>> => {
    return async () => {
        await UserModel.updateOne(
            { username: username },
            { $set: { profilePicture: uploadResult.url } },
        );

        return uploadResult;
    };
};
