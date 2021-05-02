import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { Book } from '../../entities/book';
import { chain } from 'fp-ts/TaskEither';
import { validateRequestParamUseCase } from '../../use-cases/validate-request-param';
import { getBookByTransactionUseCase } from '../../use-cases/books/get-book-by-transaction';

export const getBookByTransactionController: Controller<AppError, Book> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestParamUseCase(request, 'transactionId'),
        toTaskEither,
        chain((transactionId) =>
            pipe(getBookByTransactionUseCase(transactionId), toTaskEither),
        ),
        toResponse(false),
    );
