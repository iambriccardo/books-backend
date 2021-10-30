import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import { logger } from './logging';
import {
    AppError,
    errorToJsonResponse,
    errorToStatusCode,
    FileUploadError,
    UnsupportedMediaTypeError,
} from '../errors/base';
import { Error } from 'mongoose';

export const supportedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const upload = multer({
    limits: {
        // We limit the file size to 5MB (5000000 bytes).
        fileSize: 5000000,
    },
    fileFilter: (req, file, cb) => {
        if (supportedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('UnsupportedMediaType'));
        }
    },
});

const handleMulterError = (
    req: Request,
    res: Response,
    next: NextFunction,
    error: any,
    filename: string,
) => {
    if (error) {
        const appError = deriveAppError(filename, error);
        const statusCode = errorToStatusCode(appError);

        logger.warn(
            `An error occurred in multer while reading file ${filename} because ${error}`,
        );

        res.status(statusCode).json(
            errorToJsonResponse(statusCode, req.originalUrl, appError),
        );
    } else {
        next();
    }
};

const deriveAppError = (filename: string, error: any): AppError => {
    if (error instanceof Error) {
        if (error.message === 'UnsupportedMediaType')
            return new UnsupportedMediaTypeError(supportedTypes);
    }

    return new FileUploadError(filename, error);
};

export const acceptsSingleFile = (filename: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return upload.single(filename)(req, res, (err: any) =>
            handleMulterError(req, res, next, err, filename),
        );
    };
};

export const acceptsFileArray = (filename: string, maxCount: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return upload.array(filename, maxCount)(req, res, (err: any) =>
            handleMulterError(req, res, next, err, filename),
        );
    };
};
