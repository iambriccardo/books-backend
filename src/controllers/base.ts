import { Request, Response } from 'express';
import * as TE from 'fp-ts/TaskEither';
import { StatusCodes } from 'http-status-codes';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';

/**
 * Interface describing the context of the controller, as a
 * set of key value pairs which can hold any value.
 */
interface IControllerContext {
    [key: string]: unknown;
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
    context?: IControllerContext;
}

/**
 *  Interface describing the response object that a controller
 *  will return.
 */
export interface IControllerResponse<T> {
    body: T;
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
 * @param context, the context of the controller.
 */
export const expressToController = <ET, VT>(
    controller: Controller<ET, VT>,
    context?: IControllerContext,
) => {
    return async (req: Request, res: Response): Promise<void> => {
        const controllerHttpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            context: context,
        };

        // TODO: implement custom error type which maps to HTTP status codes.
        const startController = pipe(
            controller(controllerHttpRequest),
            TE.mapLeft((error) => String(error)),
        );

        const controllerResponse = await startController();
        if (E.isRight(controllerResponse)) {
            res.json({
                statusCode: StatusCodes.OK,
                ...controllerResponse.right,
            });
        } else if (E.isLeft(controllerResponse)) {
            res.json({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                body: {
                    error: controllerResponse.left,
                },
            });
        }
    };
};

/**
 * Utility function that maps a TaskEither right part to a valid controller response.
 */
export const mapToControllerResponse: <A, E>(
    fa: TE.TaskEither<E, A>,
) => TE.TaskEither<E, IControllerResponse<A>> = TE.map((response) => ({
    body: response,
}));
