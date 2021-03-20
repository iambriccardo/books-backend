import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const sellBookUseCase = (book: Book): Lazy<Promise<void>> => {
    return async () => {
        await new BookModel(book).save();
    };
};
