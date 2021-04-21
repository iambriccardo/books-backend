import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { sellBookUseCase } from '../../use-cases/books/sell-book';
import { AppError } from '../../errors/base';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { BookJTDSchemaType } from '../../entities/book';
import { chain } from 'fp-ts/TaskEither';

export const sellBookController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestBodyUseCase(request, BookJTDSchemaType),
        toTaskEither,
        chain((book) => pipe(sellBookUseCase(book), toTaskEither)),
        toResponse(false),
    );
