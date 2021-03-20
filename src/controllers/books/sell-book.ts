import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { sellBookUseCase } from '../../use-cases/books/sell-book';
import { AppError } from '../../errors/base';

export const sellBookController: Controller<AppError, void> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: IControllerRequest,
) =>
    pipe(
        sellBookUseCase(request.body),
        toTaskEither,
        mapToControllerResponse(false),
    );
