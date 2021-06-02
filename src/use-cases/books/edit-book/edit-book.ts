import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../../entities/book';
import { EditBookBody } from '../../../controllers/books/edit-book';
import { ServerError } from '../../../errors/base';

export const editBookUseCase = (
    bookId: string,
    body: EditBookBody,
): Lazy<Promise<Book>> => {
    return async () => {
        const modifiedBook = await BookModel.findOneAndUpdate(
            { bookId },
            body,
            {
                new: true,
            },
        ).lean();
        if (modifiedBook == null)
            throw new ServerError('Error while modifying the book.');

        return modifiedBook;
    };
};
