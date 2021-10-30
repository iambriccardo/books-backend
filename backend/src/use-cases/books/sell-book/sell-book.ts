import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../../entities/book';
import { SellBookBody } from '../../../controllers/books/sell-book';

export const sellBookUseCase = (body: SellBookBody): Lazy<Promise<Book>> => {
    return async () => {
        return new BookModel(body).save();
    };
};
