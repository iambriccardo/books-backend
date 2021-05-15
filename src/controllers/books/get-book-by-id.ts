import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { Book } from '../../entities/book';
import { chain } from 'fp-ts/TaskEither';
import { validateRequestParamUseCase } from '../../use-cases/validate-request-param';
import { getBookByIdUseCase } from '../../use-cases/books/get-book-by-id';

export const getBookByIdController: Controller<AppError, Book> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestParamUseCase(request, 'bookId'),
        toTaskEither,
        chain((bookId) => pipe(getBookByIdUseCase(bookId), toTaskEither)),
        toResponse(false),
    );
