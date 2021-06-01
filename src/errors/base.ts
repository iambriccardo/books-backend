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
    UnsupportedMediaType: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
    CloudinaryError: StatusCodes.INTERNAL_SERVER_ERROR,
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
    constructor(username: string) {
        super(
            'UserNotFoundError',
            'User not found error',
            `The user ${username} doesn't exist.`,
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

export class UnsupportedMediaType extends AppError {
    constructor(supportedTypes: string[]) {
        super(
            'UnsupportedMediaType',
            'Unsupported media type',
            `Only ${supportedTypes.join(',')} are supported.`,
        );
    }
}

export class CloudinaryError extends AppError {
    constructor(message: string) {
        super(
            'CloudinaryError',
            'Cloudinary error',
            `An error occurred on cloudinary: ${message}`,
        );
    }
}
