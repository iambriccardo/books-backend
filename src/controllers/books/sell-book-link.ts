import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { chain, orElse } from 'fp-ts/TaskEither';
import { validateRequestParamUseCase } from '../../use-cases/validate-request-param';
import { GenericObject } from '../../helpers/types';
import { getTransactionUseCase } from '../../use-cases/books/get-transaction';
import { createTransactionUseCase } from '../../use-cases/books/create-transaction';
import { sellBookLinkUseCase } from '../../use-cases/books/sell-book-link';
import { SELL_BOOK_CONFIRM_BASE_URL } from '../../helpers/environment';

export const sellBookLinkController: Controller<AppError, GenericObject> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestParamUseCase(request, 'bookId'),
        toTaskEither,
        chain((bookId) =>
            pipe(
                getTransactionUseCase(bookId),
                toTaskEither,
                orElse(() =>
                    pipe(createTransactionUseCase(bookId), toTaskEither),
                ),
            ),
        ),
        chain((transaction) =>
            pipe(
                sellBookLinkUseCase(SELL_BOOK_CONFIRM_BASE_URL, transaction),
                toTaskEither,
            ),
        ),
        toResponse(false),
    );
