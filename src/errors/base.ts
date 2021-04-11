import { StatusCodes } from 'http-status-codes';

interface IErrorToStatusCode {
    [key: string]: StatusCodes;
}

const ERROR_TO_STATUS_CODE: IErrorToStatusCode = {
    ServerError: StatusCodes.INTERNAL_SERVER_ERROR,
    InvalidBodyError: StatusCodes.UNPROCESSABLE_ENTITY,
    InvalidFieldFormatError: StatusCodes.UNPROCESSABLE_ENTITY,
    UnauthenticatedUserError: StatusCodes.UNAUTHORIZED,
    InvalidParamError: StatusCodes.UNPROCESSABLE_ENTITY,
    UserNotFoundError: StatusCodes.INTERNAL_SERVER_ERROR,
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

export class ServerError extends AppError {
    constructor(error: string) {
        super('ServerError', 'Server error', error);
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

export class UnauthenticatedUserError extends AppError {
    constructor() {
        super(
            'UnauthenticatedUserError',
            'Unauthenticated user error',
            'The user is not authenticated, thus this request cannot be authorized.',
        );
    }
}

export class InvalidParamError extends AppError {
    constructor(paramName: string) {
        super(
            'InvalidParamError',
            'Invalid param error',
            `The parameter ${paramName} is invalid or missing.`,
        );
    }
}

export class UserNotFoundError extends AppError {
    constructor(username: string) {
        super(
            'UserNotFoundError',
            'User not found error',
            `The user ${username} doesn't exist.`,
        );
    }
}
