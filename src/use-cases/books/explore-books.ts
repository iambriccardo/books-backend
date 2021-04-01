import { Lazy } from 'fp-ts/function';
import { Explore } from '../../entities/explore';
import { Book } from '../../entities/book';

export const exploreBooksUseCase = (
    recentlyViewedBooks: Book[],
    mayInterestYouBooks: Book[],
): Lazy<Promise<Explore>> => {
    return async () => {
        return {
            recentlyViewed: recentlyViewedBooks,
            mayInterestYou: mayInterestYouBooks,
        };
    };
};
