import { InvalidFieldFormatError } from '../errors/base';
import validator from 'validator';

export const check = <T>(
    field: string,
    block: (value: T) => boolean,
    value: T,
) => {
    if (!block(value)) {
        throw new InvalidFieldFormatError(field);
    }
};

export const checkInArray = <T>(field: string, value: T, array: T[]) => {
    check(field, (innerValue) => array.includes(innerValue), value);
};

export const checkNonEmpty = (field: string, value: string) => {
    check(field, (val) => !validator.isEmpty(val), value);
};

export const optionalCheck = <T>(
    field: string,
    block: (value: T) => boolean,
    value?: T,
) => {
    if (value != null) check(field, block, value);
};

export const optionalCheckInArray = <T>(
    field: string,
    value: T,
    array: T[],
) => {
    optionalCheck(field, (innerValue) => array.includes(innerValue), value);
};

export const optionalCheckNonEmpty = (field: string, value?: string) => {
    optionalCheck(field, (val) => !validator.isEmpty(val), value);
};
