import { Lazy } from 'fp-ts/function';
import { IUserBase } from '../../../entities/user';

export const sanitizeLoginUseCase = (
    requestBody: Record<string, unknown>,
): Lazy<Promise<IUserBase>> => {
    return async () => {
        console.log(
            `login with ${requestBody.username} ${requestBody.password}`,
        );

        const user: IUserBase = {
            username: requestBody.username as string,
            password: requestBody.password as string,
        };

        return user;
    };
};
