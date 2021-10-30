import { StatusCodes } from 'http-status-codes';
import { GenericObject } from '../helpers/types';
import { Request, Response } from 'express';

interface IErrorToStatusCode {
    [key: string]: StatusCodes;
}

const ERROR_TO_STATUS_CODE: IErrorToStatusCode = {
    InvalidBodyError: StatusCodes.UNPROCESSABLE_ENTITY,
    InvalidFieldFormatError: StatusCodes.UNPROCESSABLE_ENTITY,
    InvalidParamError: StatusCodes.UNPROCESSABLE_ENTITY,
    UnauthenticatedUserError: StatusCodes.UNAUTHORIZED,
    ServerError: StatusCodes.INTERNAL_SERVER_ERROR,
    UserNotFoundError: StatusCodes.INTERNAL_SERVER_ERROR,
    FileUploadError: StatusCodes.INTERNAL_SERVER_ERROR,
    UnauthorizedError: StatusCodes.UNAUTHORIZED,
    AuthenticationError: StatusCodes.UNAUTHORIZED,
    UnsupportedMediaTypeError: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
    CloudinaryError: StatusCodes.INTERNAL_SERVER_ERROR,
    GCPError: StatusCodes.INTERNAL_SERVER_ERROR,
    PasswordsNotMatchingError: StatusCodes.UNPROCESSABLE_ENTITY,
    PasswordsEqualError: StatusCodes.UNPROCESSABLE_ENTITY,
    TooManyRequestsError: StatusCodes.TOO_MANY_REQUESTS,
    UserAlreadyExistsError: 512,
    EmailAlreadyExistsError: 512,
};

export const errorToStatusCode = (error: AppError): StatusCodes => {
    return (
        ERROR_TO_STATUS_CODE[error.type] || StatusCodes.INTERNAL_SERVER_ERROR
    );
};

export const errorToJsonResponse = (
    status: StatusCodes,
    instance: string,
    error: AppError,
): GenericObject => {
    return {
        type: error.type,
        title: error.title,
        status: status,
        detail: error.detail,
        instance: instance,
    };
};

export const respondWithError = (
    req: Request,
    res: Response,
    error: AppError,
): void => {
    const statusCode = errorToStatusCode(error);
    const body = errorToJsonResponse(statusCode, req.originalUrl, error);

    res.status(statusCode).json(body);
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
    constructor(user: string) {
        super(
            'UserNotFoundError',
            'User not found error',
            `The user ${user} doesn't exist.`,
        );
    }
}

export class FileUploadError extends AppError {
    constructor(filename: string, error: string) {
        super(
            'FileUploadError',
            'File upload error',
            `The file ${filename} cannot be uploaded because ${error}.`,
        );
    }
}

export class UnauthorizedError extends AppError {
    constructor() {
        super(
            'UnauthorizedError',
            'Unauthorized error',
            'You are not authorized to perform this action.',
        );
    }
}

export class AuthenticationError extends AppError {
    constructor() {
        super(
            'AuthenticationError',
            'Authentication error',
            'There was a problem with the authentication.',
        );
    }
}

export class UnsupportedMediaTypeError extends AppError {
    constructor(supportedTypes: string[]) {
        super(
            'UnsupportedMediaTypeError',
            'Unsupported media type error',
            `Only ${supportedTypes.join(',')} are supported.`,
        );
    }
}

export class CloudinaryError extends AppError {
    constructor(message: string) {
        super(
            'CloudinaryError',
            'Cloudinary error',
            `An error occurred with Cloudinary: ${message}`,
        );
    }
}

export class GCPError extends AppError {
    constructor(message: string) {
        super(
            'GCPError',
            'GCP error',
            `An error occurred with Google Cloud Platform: ${message}`,
        );
    }
}

export class PasswordsNotMatchingError extends AppError {
    constructor() {
        super(
            'PasswordsNotMatchingError',
            'Passwords not matching error',
            `The passwords are not matching.`,
        );
    }
}

export class PasswordsEqualError extends AppError {
    constructor() {
        super(
            'PasswordsEqualError',
            'Passwords equal error',
            `The passwords are equal.`,
        );
    }
}

export class TooManyRequestsError extends AppError {
    constructor() {
        super(
            'TooManyRequestsError',
            'Too many requests error',
            `The number of requests made by this client exceeded the limit, try again later.`,
        );
    }
}

export class UserAlreadyExistsError extends AppError {
    constructor(username: string) {
        super(
            'UserAlreadyExistsError',
            'User already exists error',
            `The user ${username} already exists, try another username.`,
        );
    }
}

export class EmailAlreadyExistsError extends AppError {
    constructor(email: string) {
        super(
            'EmailAlreadyExistsError',
            'Email already exists error',
            `The email ${email} already exists, try another email.`,
        );
    }
}
