import { Lazy } from 'fp-ts/function';
import validator from 'validator';
import { check, optionalCheckNonEmpty } from '../../../helpers/validation';
import { EditBookBody } from '../../../controllers/books/edit-book';

export const validateEditBookUseCase = (
    body: EditBookBody,
): Lazy<Promise<EditBookBody>> => {
    return async () => {
        optionalCheckNonEmpty('description', body.description);

        optionalCheckNonEmpty('currency', body.currency);

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
