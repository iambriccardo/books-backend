import { IControllerContext } from '../../controllers/base';
import { Lazy } from 'fp-ts/function';
import { StatusCodes } from 'http-status-codes';

export const logoutUseCase = (
    context: IControllerContext,
): Lazy<Promise<void>> => {
    return async () => {
        context.expressRequest.session.destroy(() => {
            context.expressResponse.clearCookie('connect.sid');
            context.expressResponse.status(StatusCodes.OK).json();
        });
    };
};
