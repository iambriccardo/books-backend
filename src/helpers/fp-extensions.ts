import { Lazy } from 'fp-ts/function';
import { TaskEither, tryCatch } from 'fp-ts/TaskEither';
import { AppError } from '../errors/base';

export const toTaskEither = <T>(
    lazyPromise: Lazy<Promise<T>>,
): TaskEither<AppError, T> => {
    return tryCatch(lazyPromise, toAppError);
};

export const toAppError = (error: unknown): AppError => {
    return error as AppError;
};
