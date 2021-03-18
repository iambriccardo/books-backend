import { StatusCodes } from 'http-status-codes';

interface IErrorToStatusCode {
    [key: string]: StatusCodes;
}

const ERROR_TO_STATUS_CODE: IErrorToStatusCode = {
    GenericError: StatusCodes.INTERNAL_SERVER_ERROR,
    MalformedDataError: StatusCodes.UNPROCESSABLE_ENTITY,
};

export const errorToStatusCode = (error: AppError): StatusCodes => {
    return ERROR_TO_STATUS_CODE[error.type];
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

export class MalformedDataError extends AppError {
    constructor() {
        super(
            'MalformedDataError',
            'Malformed data',
            'The data looks like to be malformed',
        );
    }
}
