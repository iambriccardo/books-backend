import { Lazy } from 'fp-ts/function';
import { TaskEither, tryCatch } from 'fp-ts/TaskEither';
import { AppError, ServerError } from '../errors/base';

export const withValue = <T>(value: T): Lazy<Promise<T>> => {
    return async () => {
        return value;
    };
};

export const toTaskEither = <T>(
    lazyPromise: Lazy<Promise<T>>,
): TaskEither<AppError, T> => {
    return tryCatch(lazyPromise, toAppError);
};

export const toAppError = (error: unknown): AppError => {
    if (error instanceof AppError) {
        return error;
    } else if (error instanceof Error) {
        return new ServerError(error.message);
    } else {
        return new ServerError(JSON.stringify(error));
    }
};

/**
 * Custom reduce function which reduces an array to an item of equal of different type,
 * via an asynchronous set of computations.
 */
export const asyncReduce = async <U, T>(
    elements: T[],
    block: (acc: U, element: T) => Promise<U>,
    initialValue: U,
): Promise<U> => {
    let acc = initialValue;

    for (const element of elements) {
        acc = await block(acc, element);
    }

    return acc;
};
