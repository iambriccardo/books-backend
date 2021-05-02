import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';
import { EditBookBody } from '../../controllers/books/edit-book';

export const editBookUseCase = (
    bookId: string,
    body: EditBookBody,
): Lazy<Promise<Book>> => {
    return async () => {
        await BookModel.findOneAndUpdate({ bookId }, body);

        const modifiedBook = await BookModel.findOne({ bookId }).lean();
        if (modifiedBook == null)
            throw new Error('Error while modifying the book.');

        return modifiedBook;
    };
};
