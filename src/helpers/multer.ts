import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import { logger } from './logging';
import {
    errorToJsonResponse,
    errorToStatusCode,
    FileUploadError,
} from '../errors/base';

const upload = multer({
    limits: {
        // We limit the file size to 5MB (5000000 bytes).
        fileSize: 5000000,
    },
});

const handleMulterError = (
    req: Request,
    res: Response,
    next: NextFunction,
    err: any,
    filename: string,
) => {
    if (err) {
        const error = new FileUploadError(filename, err);
        const statusCode = errorToStatusCode(error);

        logger.warn(
            `An error occurred in multer while reading file ${filename} because ${err}`,
        );

        res.status(statusCode).json(
            errorToJsonResponse(statusCode, req.originalUrl, error),
        );
    } else {
        next();
    }
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
