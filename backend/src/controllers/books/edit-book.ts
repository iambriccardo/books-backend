import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { Book } from '../../entities/book';
import { chain, map, taskEither } from 'fp-ts/TaskEither';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { editBookUseCase } from '../../use-cases/books/edit-book/edit-book';
import { sequenceT } from 'fp-ts/Apply';
import { validateRequestParamUseCase } from '../../use-cases/validate-request-param';
import { validateEditBookUseCase } from '../../use-cases/books/edit-book/validate-edit-book';
import { getAllCurrenciesUseCase } from '../../use-cases/currencies/get-all-currencies';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';

export interface EditBookBody {
    description?: string;
    currency?: string;
    amount?: number;
    condition?: 'bad' | 'ok' | 'good' | 'great' | 'na';
    pictures?: string[];
}

const EditBookBodyJTDSchemaType: JTDSchemaType<EditBookBody> = {
    optionalProperties: {
        description: { type: 'string' },
        currency: { type: 'string' },
        amount: { type: 'float32' },
        condition: { enum: ['bad', 'ok', 'good', 'great', 'na'] },
        pictures: {
            elements: {
                type: 'string',
            },
        },
    },
};

export const editBookController: Controller<AppError, Book> = (
    request: IControllerRequest,
) =>
    pipe(
        sequenceT(taskEither)(
            pipe(
                getUserFromRequestUseCase(request),
                toTaskEither,
                map((user) => user.userId),
            ),
            pipe(validateRequestParamUseCase(request, 'bookId'), toTaskEither),
            pipe(
                validateRequestBodyUseCase(request, EditBookBodyJTDSchemaType),
                toTaskEither,
            ),
            pipe(getAllCurrenciesUseCase(), toTaskEither),
        ),
        chain(([userId, bookId, body, currencies]) =>
            pipe(
                validateEditBookUseCase(body, currencies),
                toTaskEither,
                map(
                    () =>
                        [userId, bookId, body] as [
                            string,
                            string,
                            EditBookBody,
                        ],
                ),
            ),
        ),
        chain(([userId, bookId, body]) =>
            pipe(editBookUseCase(userId, bookId, body), toTaskEither),
        ),
        toResponse(false),
    );
