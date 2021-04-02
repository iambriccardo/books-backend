import {
    Controller,
    getUserFromRequest,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { AppError } from '../../errors/base';
import { Explore } from '../../entities/explore';
import { pipe } from 'fp-ts/function';
import { exploreBooksUseCase } from '../../use-cases/books/explore-books';
import { toTaskEither } from '../../helpers/fp-extensions';
import { sequenceT } from 'fp-ts/Apply';
import * as TE from 'fp-ts/TaskEither';
import { chain } from 'fp-ts/TaskEither';
import { getRecentlyViewedBooksUseCase } from '../../use-cases/books/get-recently-viewed-books';
import { getMayInterestYouBooksUseCase } from '../../use-cases/books/get-may-interest-you-books';
import { Book } from '../../entities/book';

export const exploreBooksController: Controller<AppError, Explore> = (
    request: IControllerRequest,
) =>
    pipe(
        sequenceT(TE.taskEither)(
            pipe(
                getRecentlyViewedBooksUseCase(getUserFromRequest(request)),
                toTaskEither,
            ),
            pipe(
                getMayInterestYouBooksUseCase(getUserFromRequest(request)),
                toTaskEither,
            ),
        ),
        chain((result: [Book[], Book[]]) =>
            pipe(exploreBooksUseCase(result[0], result[1]), toTaskEither),
        ),
        mapToControllerResponse(false),
    );
