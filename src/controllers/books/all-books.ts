import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { pipe } from 'fp-ts/function';
import { allBooksUseCase } from '../../use-cases/books/all-books';
import { fromLazyPromise } from '../../helpers/fp-extensions';

export const buildBooksController: Controller<Error, string[]> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: IControllerRequest,
) => pipe(allBooksUseCase(), fromLazyPromise, mapToControllerResponse);
