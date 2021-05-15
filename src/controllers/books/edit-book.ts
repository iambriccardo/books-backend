import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { AppError } from '../../errors/base';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { Book } from '../../entities/book';
import { chain, taskEither } from 'fp-ts/TaskEither';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { editBookUseCase } from '../../use-cases/books/edit-book/edit-book';
import { sequenceT } from 'fp-ts/Apply';
import { validateRequestParamUseCase } from '../../use-cases/validate-request-param';
import { validateEditBookUseCase } from '../../use-cases/books/edit-book/validate-edit-book';

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
            pipe(validateRequestParamUseCase(request, 'bookId'), toTaskEither),
            pipe(
                validateRequestBodyUseCase(request, EditBookBodyJTDSchemaType),
                toTaskEither,
            ),
        ),
        chain(([bookId, bookModifications]) =>
            pipe(
                validateEditBookUseCase(bookModifications),
                toTaskEither,
                chain(() =>
                    pipe(
                        editBookUseCase(bookId, bookModifications),
                        toTaskEither,
                    ),
                ),
            ),
        ),
        toResponse(false),
    );
