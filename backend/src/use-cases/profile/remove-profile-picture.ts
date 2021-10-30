import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../entities/user';

export const removeProfilePictureUseCase = (
    username: string,
): Lazy<Promise<void>> => {
    return async () => {
        await UserModel.updateOne(
            { username: username },
            { $unset: { profilePicture: '' } },
        );
    };
};
