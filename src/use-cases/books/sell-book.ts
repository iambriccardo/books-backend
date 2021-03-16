import { Lazy } from 'fp-ts/function';
import { Book, IBook } from '../../entities/book';

export const sellBookUseCase = (newBook: IBook): Lazy<Promise<void>> => {
    return async () => {
        const book = new Book(newBook);
        await book.save();
    };
};
