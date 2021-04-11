import { InvalidFieldFormatError } from '../errors/base';

export const check = <T>(
    field: string,
    block: (value: T) => boolean,
    value: T,
) => {
    if (!block(value)) {
        throw new InvalidFieldFormatError(field);
    }
};

export const optionalCheck = <T>(
    field: string,
    block: (value: T) => boolean,
    value?: T,
) => {
    if (value != null) {
        check(field, block, value);
    }
};
