import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { Book } from '../../entities/book';
import { searchBooksUseCase } from '../../use-cases/books/search-books';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { chain } from 'fp-ts/TaskEither';

interface SearchBooksBody {
    searchQuery: string;
}

const SearchBooksJTDSchemaType: JTDSchemaType<SearchBooksBody> = {
    properties: {
        searchQuery: { type: 'string' },
    },
};

export const searchBooksController: Controller<AppError, Book[]> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestBodyUseCase(request, SearchBooksJTDSchemaType),
        toTaskEither,
        chain((body) =>
            pipe(searchBooksUseCase(body.searchQuery), toTaskEither),
        ),
        toResponse(false),
    );
