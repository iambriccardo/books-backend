import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { Explore } from '../../entities/explore';
import { pipe } from 'fp-ts/function';
import { exploreBooksUseCase } from '../../use-cases/books/explore-books';
import { toTaskEither } from '../../helpers/fp-extensions';
import { sequenceT } from 'fp-ts/Apply';
import { chain, taskEither } from 'fp-ts/TaskEither';
import { getRecentlyViewedBooksUseCase } from '../../use-cases/books/get-recently-viewed-books';
import { getMayInterestYouBooksUseCase } from '../../use-cases/books/get-may-interest-you-books';
import { Book } from '../../entities/book';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';

export const exploreBooksController: Controller<AppError, Explore> = (
    request: IControllerRequest,
) =>
    pipe(
        getUserFromRequestUseCase(request),
        toTaskEither,
        chain((user) =>
            sequenceT(taskEither)(
                pipe(getRecentlyViewedBooksUseCase(user), toTaskEither),
                pipe(getMayInterestYouBooksUseCase(user), toTaskEither),
            ),
        ),
        chain((result: [Book[], Book[]]) =>
            pipe(exploreBooksUseCase(result[0], result[1]), toTaskEither),
        ),
        toResponse(false),
    );
