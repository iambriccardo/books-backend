import { Lazy } from 'fp-ts/function';
import { EditProfileBody } from '../../../controllers/profile/edit-profile';
import { User, UserModel } from '../../../entities/user';

export const editProfileUseCase = (
    userId: string,
    body: EditProfileBody,
): Lazy<Promise<User>> => {
    return async () => {
        const modifiedProfile = await UserModel.findOneAndUpdate(
            { userId },
            body,
            {
                new: true,
            },
        ).lean();
        if (modifiedProfile == null)
            throw new Error('Error while modifying the profile.');

        return modifiedProfile;
    };
};
