import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither, withValue } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { Book } from '../../entities/book';
import { searchBooksUseCase } from '../../use-cases/books/search-books';
import { chain, map, orElse, taskEither } from 'fp-ts/TaskEither';
import { sequenceT } from 'fp-ts/Apply';
import { validateRequestQueryParam } from '../../use-cases/validate-request-query-param';

export const searchBooksController: Controller<AppError, Book[]> = (
    request: IControllerRequest,
) =>
    pipe(
        sequenceT(taskEither)(
            pipe(
                validateRequestQueryParam(request, 'searchQuery'),
                toTaskEither,
            ),
            pipe(
                validateRequestQueryParam(request, 'limit'),
                toTaskEither,
                map((limit) => Number(limit)),
                orElse(() => pipe(withValue(0), toTaskEither)),
            ),
        ),
        chain(([query, limit]) =>
            pipe(searchBooksUseCase(query, limit), toTaskEither),
        ),
        toResponse(false),
    );
