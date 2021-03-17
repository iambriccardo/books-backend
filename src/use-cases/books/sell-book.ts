import { Lazy } from 'fp-ts/function';
import { Book, IBook } from '../../entities/book';

export const sellBookUseCase = (book: IBook): Lazy<Promise<void>> => {
    return async () => {
        const bookModel = new Book(book);
        await bookModel.save();
    };
};
