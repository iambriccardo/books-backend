import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { sellBookUseCase } from '../../use-cases/books/sell-book';
import { AppError } from '../../errors/base';
import { validateBodyUseCase } from '../../use-cases/validate-body';
import { BookJTDSchemaType } from '../../entities/book';
import { chain } from 'fp-ts/TaskEither';

export const sellBookController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        validateBodyUseCase(request, BookJTDSchemaType),
        toTaskEither,
        chain((book) => pipe(sellBookUseCase(book), toTaskEither)),
        mapToControllerResponse(false),
    );
