/**
 *  Type definition of the middleware.
 *
 *  A middleware is a function used to perform some computation on a given
 *  value. This computation can be a mapping, some logging or any kind of operation
 *  that can mutate or not the input value.
 */
export type Middleware<T> = (value: T) => T;
