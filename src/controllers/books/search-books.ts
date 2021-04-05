import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { AppError } from '../../errors/base';
import { Book } from '../../entities/book';
import { searchBooksUseCase } from '../../use-cases/books/search-books';

export const searchBooksController: Controller<AppError, Book[]> = (
    request: IControllerRequest,
) =>
    pipe(
        searchBooksUseCase(request.body.searchQuery),
        toTaskEither,
        toResponse(false),
    );
