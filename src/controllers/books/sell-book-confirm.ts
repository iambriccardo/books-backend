import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { chain, taskEither } from 'fp-ts/TaskEither';
import { validateRequestParamUseCase } from '../../use-cases/validate-request-param';
import { sellBookConfirmUseCase } from '../../use-cases/books/sell-book-confirm';
import { sequenceT } from 'fp-ts/Apply';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';

export const sellBookConfirmController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        sequenceT(taskEither)(
            pipe(getUserFromRequestUseCase(request), toTaskEither),
            pipe(
                validateRequestParamUseCase(request, 'transactionId'),
                toTaskEither,
            ),
        ),
        chain(([user, transactionId]) =>
            pipe(
                sellBookConfirmUseCase(user.userId, transactionId),
                toTaskEither,
            ),
        ),
        toResponse(false),
    );
