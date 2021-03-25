import { InvalidFieldFormatError } from '../errors/base';

export const check = <T>(
    field: string,
    value: T,
    block: (value: T) => boolean,
) => {
    if (!block(value)) {
        throw new InvalidFieldFormatError(field);
    }
};
