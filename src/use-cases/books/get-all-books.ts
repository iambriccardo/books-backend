import { Lazy } from 'fp-ts/function';
import { Book, BookModel } from '../../entities/book';

export const getAllBooksUseCase = (): Lazy<Promise<Book[]>> => {
    return async () => {
        return await BookModel.find({}).exec();
    };
};
