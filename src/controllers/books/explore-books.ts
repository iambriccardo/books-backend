import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { exploreBooksUseCase } from '../../use-cases/books/explore-books';
import { toTaskEither } from '../../helpers/extensions';
import { sequenceT } from 'fp-ts/Apply';
import { chain, taskEither } from 'fp-ts/TaskEither';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { GenericObject } from '../../helpers/types';
import { shuffleBooksUseCase } from '../../use-cases/books/shuffle-books';

export const exploreBooksController: Controller<AppError, GenericObject> = (
    request: IControllerRequest,
) =>
    pipe(
        getUserFromRequestUseCase(request),
        toTaskEither,
        chain((user) =>
            sequenceT(taskEither)(
                pipe(shuffleBooksUseCase(user.userId), toTaskEither),
                pipe(shuffleBooksUseCase(user.userId), toTaskEither),
                pipe(shuffleBooksUseCase(user.userId), toTaskEither),
            ),
        ),
        chain(([popularBooks, mayInterestYouBooks, recentlyViewedBooks]) =>
            pipe(
                exploreBooksUseCase(
                    popularBooks,
                    mayInterestYouBooks,
                    recentlyViewedBooks,
                ),
                toTaskEither,
            ),
        ),
        toResponse(false),
    );
