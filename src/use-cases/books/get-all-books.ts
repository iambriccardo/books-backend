import { Lazy } from 'fp-ts/function';
import { BookDocument, BookModel } from '../../entities/book';

export const getAllBooksUseCase = (): Lazy<Promise<BookDocument[]>> => {
    return async () => {
        return await BookModel.find({}).exec();
    };
};
