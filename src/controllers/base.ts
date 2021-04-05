import { NextFunction, Request, Response } from 'express';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as T from 'fp-ts/Tuple';
import { pipe } from 'fp-ts/lib/function';
import { AppError, errorToStatusCode } from '../errors/base';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../helpers/logging';
import { Middleware } from '../middlewares/base';

/**
 * Interface describing the context of the controller, as a
 * set of key value pairs which can hold any value.
 */
export interface IControllerContext {
    expressRequest: Request;
    expressResponse: Response;
    expressNext: NextFunction;
}

/**
 * Interface describing the request object that a controller
 * can take.
 *
 * Via this interface we pass to the controller all the necessary
 * dependencies and information.
 */
export interface IControllerRequest {
    body: Request['body'];
    query: Request['query'];
    params: Request['params'];
    context: IControllerContext;
}

/**
 *  Interface describing the response object that a controller
 *  will return.
 */
export interface IControllerResponse<T> {
    body: T;
    responseHandled: boolean;
}

/**
 *  Type definition of the controller.
 */
export type Controller<ET, VT> = (
    request: IControllerRequest,
) => TE.TaskEither<ET, IControllerResponse<VT>>;

/**
 * Helper function which generates a middleware responsible of the interaction between express.js
 * and the controller.
 *
 * The idea is to handle the requests all in the controller via a well defined interface, in order
 * to completely hide the underlying framework used for communication. Moreover this implementation
 * allows for a centralized representation of the json responses.
 *
 * @param controller, the controller which will handle the communication.
 * @param middlewares, the list of middlewares used to transform the request.
 */
export const expressToController = <VT>(
    controller: Controller<AppError, VT>,
    ...middlewares: Middleware<IControllerRequest>[]
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        logger.info(`Handling request ${req.originalUrl} with:`);
        logger.info(`* body -> ${JSON.stringify(req.body)}`);
        logger.info(`* query -> ${JSON.stringify(req.query)}`);
        logger.info(`* params -> ${JSON.stringify(req.params)}`);

        let controllerHttpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            context: {
                expressRequest: req,
                expressResponse: res,
                expressNext: next,
            },
        };

        for (const middleware of middlewares) {
            // TODO: add error handling for middlewares.
            controllerHttpRequest = await middleware(controllerHttpRequest);
        }

        const startController = pipe(
            controller(controllerHttpRequest),
            TE.mapLeft(
                (error) =>
                    [error, errorToStatusCode(error)] as [
                        AppError,
                        StatusCodes,
                    ],
            ),
        );

        const controllerResponse = await startController();
        if (E.isRight(controllerResponse)) {
            const response = controllerResponse.right;
            const statusCode = StatusCodes.OK;

            logger.info(`Request ${req.originalUrl} successfully handled.`);

            if (!response.responseHandled) {
                res.status(statusCode).json({
                    status: statusCode,
                    body: response.body,
                });
            }
        } else if (E.isLeft(controllerResponse)) {
            const error = T.fst(controllerResponse.left);
            const statusCode = T.snd(controllerResponse.left);

            logger.warn(
                `Request ${req.originalUrl} cannot be handled because of ${error.title} -> ${statusCode}`,
            );

            res.status(statusCode).json({
                type: error.type,
                title: error.title,
                status: statusCode,
                detail: error.detail,
                instance: req.originalUrl,
            });
        }
    };
};

/**
 * Utility function that maps a TaskEither right part to a valid controller response.
 */
export const toResponse: (
    responseHandled: boolean,
) => <E, A>(
    fa: TE.TaskEither<E, A>,
) => TE.TaskEither<E, IControllerResponse<A>> = (responseHandled = false) => {
    return TE.map((response) => ({
        body: response,
        // TODO: find better way to handle this.
        responseHandled: responseHandled,
    }));
};
