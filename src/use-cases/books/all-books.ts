import { Lazy } from 'fp-ts/function';

export const allBooksUseCase = (): Lazy<Promise<string[]>> => {
    return async () => {
        return ['Alice in Wonderland', 'Lord of Rings', 'Steve Jobs Biography'];
    };
};
