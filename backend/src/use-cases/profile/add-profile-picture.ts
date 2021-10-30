import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';

export const addProfilePictureUseCase = (
    userId: string,
    url?: string,
): Lazy<Promise<void>> => {
    return async () => {
        if (url) {
            await UserModel.updateOne(
                { userId: userId },
                { $set: { profilePicture: url } },
            );
        }
    };
};
