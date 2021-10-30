import { Lazy } from 'fp-ts/function';
import { Book } from '../../entities/book';
import { GenericObject } from '../../helpers/types';

export const exploreBooksUseCase = (
    popularBooks: Book[],
    mayInterestYouBooks: Book[],
    recentlyViewedBooks: Book[],
): Lazy<Promise<GenericObject>> => {
    return async () => {
        return {
            popular: popularBooks,
            mayInterestYou: mayInterestYouBooks,
            recentlyViewed: recentlyViewedBooks,
        };
    };
};
