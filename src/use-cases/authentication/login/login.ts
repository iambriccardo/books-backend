import { Lazy } from 'fp-ts/function';
import { authenticate } from 'passport';
import { UserDocument } from '../../../entities/user';
import { IVerifyOptions } from 'passport-local';
import { API_VERSION } from '../../../helpers/environment';
import { IControllerContext } from '../../../controllers/base';
import { StatusCodes } from 'http-status-codes';
import { ServerError } from '../../../errors/base';

export const loginUseCase = (
    context: IControllerContext,
): Lazy<Promise<void>> => {
    return async () => {
        authenticate(
            'local',
            (err: Error, user: UserDocument, info: IVerifyOptions) => {
                if (err) return context.expressNext(err);

                if (!user)
                    return context.expressResponse
                        .status(StatusCodes.UNAUTHORIZED)
                        .json();

                context.expressRequest.logIn(user, (err) => {
                    if (err) return context.expressNext(err);

                    return context.expressResponse.redirect(
                        `${API_VERSION}/books/explore`,
                    );
                });
            },
        )(context.expressRequest, context.expressResponse, context.expressNext);
    };
};
