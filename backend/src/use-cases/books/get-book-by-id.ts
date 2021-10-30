import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const getBookByIdUseCase = (bookId: string): Lazy<Promise<Book>> => {
    return async () => {
        const book = await BookModel.findOne({ bookId });
        if (!book) throw new Error('The book does not exist.');

        return book;
    };
};
