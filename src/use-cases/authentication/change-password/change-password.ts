import { Lazy } from 'fp-ts/function';
import { UserModel } from '../../../entities/user';
import { ChangePasswordBody } from '../../../controllers/authentication/change-password';
import { UserNotFoundError } from '../../../errors/base';

export const changePasswordUseCase = (
    userId: string,
    body: ChangePasswordBody,
): Lazy<Promise<void>> => {
    return async () => {
        const existingUser = await UserModel.findOne({ userId }).lean();
        if (!existingUser) throw new UserNotFoundError(userId);

        existingUser.password = body.newPassword;

        await UserModel.deleteOne({ userId });

        await new UserModel(existingUser).save();
    };
};
