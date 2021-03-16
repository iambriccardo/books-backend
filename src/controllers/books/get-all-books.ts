import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { pipe } from 'fp-ts/function';
import { getAllBooksUseCase } from '../../use-cases/books/get-all-books';
import { fromLazyPromise } from '../../helpers/fp-extensions';
import { IBook } from '../../entities/book';

export const getAllBooksController: Controller<Error, IBook[]> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: IControllerRequest,
) => pipe(getAllBooksUseCase(), fromLazyPromise, mapToControllerResponse);
