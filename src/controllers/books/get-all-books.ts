import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { pipe } from 'fp-ts/function';
import { getAllBooksUseCase } from '../../use-cases/books/get-all-books';
import { toTaskEither } from '../../helpers/fp-extensions';
import { BookDocument } from '../../entities/book';
import { AppError } from '../../errors/base';

export const getAllBooksController: Controller<AppError, BookDocument[]> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: IControllerRequest,
) => pipe(getAllBooksUseCase(), toTaskEither, mapToControllerResponse(false));
