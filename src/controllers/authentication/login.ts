import { NextFunction, Request, Response } from 'express';
import { authenticate } from 'passport';
import { IUser } from '../../entities/user';
import { IVerifyOptions } from 'passport-local';

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    authenticate('local', (err: Error, user: IUser, info: IVerifyOptions) => {
        if (err) return next(err);

        if (!user) return res.redirect('/login');

        req.logIn(user, (err) => {
            if (err) return next(err);

            return res.redirect('v1/books/');
        });
    })(req, res, next);
};
