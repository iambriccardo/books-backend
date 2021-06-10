import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import {
    check,
    optionalCheckInArray,
    optionalCheckNonEmpty,
} from '../../../helpers/validation';
import { EditBookBody } from '../../../controllers/books/edit-book';
import { Currency } from '../../../entities/currencies';

export const validateEditBookUseCase = (
    body: EditBookBody,
    currencies: Currency[],
): Lazy<Promise<EditBookBody>> => {
    return async () => {
        optionalCheckNonEmpty('description', body.description);

        optionalCheckNonEmpty('currency', body.currency);

        optionalCheckInArray(
            'currency',
            body.currency,
            currencies.map((currency) => currency.symbol),
        );

        body.pictures?.forEach((picture, index) =>
            check(
                `picture[${index}]`,
                (value) => validator.isURL(value),
                picture,
            ),
        );

        return body;
    };
};
