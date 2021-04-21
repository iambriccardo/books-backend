import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { exploreBooksUseCase } from '../../use-cases/books/explore-books';
import { toTaskEither } from '../../helpers/extensions';
import { sequenceT } from 'fp-ts/Apply';
import { chain, taskEither } from 'fp-ts/TaskEither';
import { getRecentlyViewedBooksUseCase } from '../../use-cases/books/get-recently-viewed-books';
import { getMayInterestYouBooksUseCase } from '../../use-cases/books/get-may-interest-you-books';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { GenericObject } from '../../helpers/types';

export const exploreBooksController: Controller<AppError, GenericObject> = (
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
        chain(([recentlyViewed, mayInterestYou]) =>
            pipe(
                exploreBooksUseCase(recentlyViewed, mayInterestYou),
                toTaskEither,
            ),
        ),
        toResponse(false),
    );
