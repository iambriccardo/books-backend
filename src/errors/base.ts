import { StatusCodes } from 'http-status-codes';

interface IErrorToStatusCode {
    [key: string]: StatusCodes;
}

const ERROR_TO_STATUS_CODE: IErrorToStatusCode = {
    GenericError: StatusCodes.INTERNAL_SERVER_ERROR,
    InvalidBodyError: StatusCodes.UNPROCESSABLE_ENTITY,
};

export const errorToStatusCode = (error: AppError): StatusCodes => {
    return (
        ERROR_TO_STATUS_CODE[error.type] || StatusCodes.INTERNAL_SERVER_ERROR
    );
};

export class AppError {
    type: string;
    title: string;
    detail: string;

    constructor(type: string, title: string, detail: string) {
        this.type = type;
        this.title = title;
        this.detail = detail;
    }
}

export class GenericError extends AppError {
    constructor(error: string) {
        super('GenericError', 'Generic error', error);
    }
}

export class InvalidBodyError extends AppError {
    constructor(message: string) {
        super(
            'InvalidBodyError',
            'Invalid body error',
            `The body of the request is not conforming to the defined schema: ${message}`,
        );
    }
}

export class InvalidFieldFormatError extends AppError {
    constructor(fieldName: string) {
        super(
            'InvalidFieldFormatError',
            'Invalid field format error',
            `The field ${fieldName} has not the correct format`,
        );
    }
}
