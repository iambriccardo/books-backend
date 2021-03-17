import { Lazy } from 'fp-ts/function';
import { TaskEither, tryCatch } from 'fp-ts/TaskEither';
import { toError } from 'fp-ts/Either';

export const toTaskEither = <T>(
    lazyPromise: Lazy<Promise<T>>,
): TaskEither<Error, T> => {
    return tryCatch(lazyPromise, toError);
};
