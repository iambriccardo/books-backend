import { Lazy } from 'fp-ts/function';
import { TaskEither, tryCatch } from 'fp-ts/TaskEither';
import { AppError, GenericError } from '../errors/base';

export const toTaskEither = <T>(
    lazyPromise: Lazy<Promise<T>>,
): TaskEither<AppError, T> => {
    return tryCatch(lazyPromise, toAppError);
};

export const toAppError = (error: unknown): AppError => {
    if (error instanceof AppError) {
        return error;
    } else if (error instanceof Error) {
        return new GenericError(error.message);
    } else {
        return error as AppError;
    }
};
