import rateLimit from 'express-rate-limit';
import { NextFunction, Request, Response } from 'express';
import { respondWithError, TooManyRequestsError } from '../errors/base';

export const defaultRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 500, // start blocking after 50 requests
    handler(req: Request, res: Response, next: NextFunction) {
        respondWithError(req, res, new TooManyRequestsError());
    },
});
