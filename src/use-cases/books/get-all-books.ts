import { Lazy } from 'fp-ts/function';
import { Book, IBook } from '../../entities/book';

export const getAllBooksUseCase = (): Lazy<Promise<IBook[]>> => {
    return async () => {
        return await Book.find({}).exec();
    };
};
