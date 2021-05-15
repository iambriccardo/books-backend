import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { sellBookUseCase } from '../../use-cases/books/sell-book/sell-book';
import { AppError } from '../../errors/base';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { Book } from '../../entities/book';
import { chain } from 'fp-ts/TaskEither';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { validateSellBookUseCase } from '../../use-cases/books/sell-book/validate-sell-book';

export interface SellBookBody {
    isbn: string;
    title: string;
    description: string;
    currency: string;
    amount: number;
    condition: 'bad' | 'ok' | 'good' | 'great' | 'na';
    pictures: string[];
    publicationDate: Date;
    seller: string;
    locationName: string;
    locationLatitude: number;
    locationLongitude: number;
}

const SellBookBodyJTDSchemaType: JTDSchemaType<SellBookBody> = {
    properties: {
        isbn: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        currency: { type: 'string' },
        amount: { type: 'float32' },
        condition: { enum: ['bad', 'ok', 'good', 'great', 'na'] },
        pictures: {
            elements: {
                type: 'string',
            },
        },
        publicationDate: { type: 'timestamp' },
        seller: { type: 'string' },
        locationName: { type: 'string' },
        locationLatitude: { type: 'float32' },
        locationLongitude: { type: 'float32' },
    },
};

export const sellBookController: Controller<AppError, Book> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestBodyUseCase(request, SellBookBodyJTDSchemaType),
        toTaskEither,
        chain((book) => pipe(validateSellBookUseCase(book), toTaskEither)),
        chain((book) => pipe(sellBookUseCase(book), toTaskEither)),
        toResponse(false),
    );
