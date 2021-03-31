import { Lazy } from 'fp-ts/function';
import { Explore } from '../../entities/explore';
import { User } from '../../entities/user';

export const exploreBooksUseCase = (user: User): Lazy<Promise<Explore>> => {
    return async () => {
        console.log(user);
        return {
            trending: [],
            newest: [],
            mayInterestYou: [],
        };
    };
};
