import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { AppError } from '../../errors/base';
import { Book } from '../../entities/book';
import { chain } from 'fp-ts/TaskEither';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { getSoldBooksUseCase } from '../../use-cases/books/get-sold-books';

export const getSoldBookController: Controller<AppError, Book[]> = (
    request: IControllerRequest,
) =>
    pipe(
        getUserFromRequestUseCase(request),
        toTaskEither,
        chain((user) => pipe(getSoldBooksUseCase(user), toTaskEither)),
        toResponse(false),
    );
