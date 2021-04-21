import passportLocal from 'passport-local';
import { NextFunction, Request, Response } from 'express';
import { NativeError } from 'mongoose';
import { UserDocument, UserModel } from '../entities/user';
import { StatusCodes } from 'http-status-codes';

export const userSerializer = (req: any, user: any, done: any) => {
    done(undefined, user.id);
};

export const userDeserializer = (id: any, done: any) => {
    UserModel.findById(id, (err: NativeError, user: UserDocument) => {
        done(err, user);
    });
};

export const LocalStrategy = new passportLocal.Strategy(
    { usernameField: 'usernameOrEmail' },
    (username, password, done) => {
        UserModel.findOne(
            {
                $or: [
                    { username: username },
                    { 'contactInformation.email': username },
                ],
            },
            (err: NativeError, user: UserDocument) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(undefined, false, {
                        message: `Username ${username} not found.`,
                    });
                }

                user.comparePassword(
                    password,
                    (err: Error, isMatch: boolean) => {
                        if (err) {
                            return done(err);
                        }

                        if (isMatch) {
                            return done(undefined, user);
                        }

                        return done(undefined, false, {
                            message: 'Invalid username or password.',
                        });
                    },
                );
            },
        );
    },
);

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(StatusCodes.UNAUTHORIZED).json();
};
