import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { chain, taskEither } from 'fp-ts/TaskEither';
import { validateRequestParamUseCase } from '../../use-cases/validate-request-param';
import { sequenceT } from 'fp-ts/Apply';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { removeBookUseCase } from '../../use-cases/books/remove-book';

export const removeBookController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        sequenceT(taskEither)(
            pipe(getUserFromRequestUseCase(request), toTaskEither),
            pipe(validateRequestParamUseCase(request, 'bookId'), toTaskEither),
        ),
        chain(([seller, bookId]) =>
            pipe(removeBookUseCase(seller.userId, bookId), toTaskEither),
        ),
        toResponse(false),
    );
