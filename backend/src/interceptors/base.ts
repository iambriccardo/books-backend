/**
 *  Type definition of the interceptor.
 *
 *  An interceptor is a function used to perform some computation on a given
 *  value. This computation can be a mapping, some logging or any kind of operation
 *  that can mutate or not the input value in an asynchronous fashion.
 */
export type Interceptor<T> = (value: T) => Promise<T>;
