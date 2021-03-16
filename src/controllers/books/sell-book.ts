import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { pipe } from 'fp-ts/function';
import { fromLazyPromise } from '../../helpers/fp-extensions';
import { sellBookUseCase } from '../../use-cases/books/sell-book';

export const sellBookController: Controller<Error, void> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: IControllerRequest,
) =>
    pipe(
        sellBookUseCase(request.body),
        fromLazyPromise,
        mapToControllerResponse,
    );
