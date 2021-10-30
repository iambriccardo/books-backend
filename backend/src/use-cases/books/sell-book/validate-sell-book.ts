import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import {
    check,
    checkInArray,
    checkNonEmpty,
} from '../../../helpers/validation';
import { SellBookBody } from '../../../controllers/books/sell-book';
import { Currency } from '../../../entities/currencies';

export const validateSellBookUseCase = (
    body: SellBookBody,
    currencies: Currency[],
): Lazy<Promise<SellBookBody>> => {
    return async () => {
        check('isbn', (isbn) => validator.isISBN(isbn), body.isbn);

        checkNonEmpty('title', body.title);

        checkNonEmpty('description', body.description);

        checkNonEmpty('currency', body.currency);

        checkInArray(
            'currency',
            body.currency,
            currencies.map((currency) => currency.symbol),
        );

        body.pictures.forEach((picture, index) =>
            check(
                `picture[${index}]`,
                (value) => validator.isURL(value),
                picture,
            ),
        );

        checkNonEmpty('locationName', body.locationName);

        return body;
    };
};
