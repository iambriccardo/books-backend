import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';

export const addProfilePictureUseCase = (
    username: string,
    url?: string,
): Lazy<Promise<void>> => {
    return async () => {
        if (url) {
            await UserModel.updateOne(
                { username: username },
                { $set: { profilePicture: url } },
            );
        }
    };
};
