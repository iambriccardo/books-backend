import { Lazy } from 'fp-ts/function';
import { Book } from '../../entities/book';
import { GenericObject } from '../../helpers/types';

export const exploreBooksUseCase = (
    recentlyViewedBooks: Book[],
    mayInterestYouBooks: Book[],
): Lazy<Promise<GenericObject>> => {
    return async () => {
        return {
            recentlyViewed: recentlyViewedBooks,
            mayInterestYou: mayInterestYouBooks,
        };
    };
};
