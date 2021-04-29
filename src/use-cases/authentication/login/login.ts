import { Lazy } from 'fp-ts/function';
import { authenticate } from 'passport';
import { IControllerContext } from '../../../controllers/base';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../../../helpers/environment';
import { StatusCodes } from 'http-status-codes';
import { AuthenticationError, respondWithError } from '../../../errors/base';

export const loginUseCase = (
    context: IControllerContext,
): Lazy<Promise<void>> => {
    return async () => {
        const req = context.expressRequest;
        const res = context.expressResponse;
        const next = context.expressNext;

        authenticate('login', async (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return respondWithError(
                        req,
                        res,
                        new AuthenticationError(),
                    );
                }

                req.login(user, { session: false }, async (error) => {
                    if (error) return next(error);

                    const body = {
                        username: user.username,
                    };
                    const token = sign({ user: body }, SECRET_KEY, {
                        expiresIn: '2d',
                    });

                    const statusCode = StatusCodes.OK;
                    return res.status(statusCode).json({
                        status: statusCode,
                        body: {
                            token: token,
                        },
                    });
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    };
};
