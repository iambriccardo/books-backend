import { Request, Response } from 'express';
import * as TE from 'fp-ts/TaskEither';
import { StatusCodes } from 'http-status-codes';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';

export interface IControllerHttpRequest {
    body: Request['body'];
    query: Request['query'];
    params: Request['params'];
}

export interface IControllerResponse<T> {
    body: T;
}

export type Controller<ET, VT> = (
    request: IControllerHttpRequest,
) => TE.TaskEither<ET, IControllerResponse<VT>>;

export const dispatchToController = <ET, VT>(
    controller: Controller<ET, VT>,
) => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async (req: Request, res: Response) => {
        const controllerHttpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
        };

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

export const attachController = (
    request: IControllerHttpRequest,
    controller: (
        request: IControllerHttpRequest,
    ) => Promise<IControllerResponse<string>>,
) => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async () => controller(request);
};
