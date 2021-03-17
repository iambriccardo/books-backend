import passportLocal from 'passport-local';
import { NextFunction, Request, Response } from 'express';
import { NativeError } from 'mongoose';
import { IUser, User } from '../entities/user';

export const userSerializer = (req: any, user: any, done: any) => {
    done(undefined, user);
};

export const userDeserializer = (id: any, done: any) => {
    User.findById(id, (err: NativeError, user: IUser) => {
        done(err, user.id);
    });
};

export const LocalStrategy = new passportLocal.Strategy(
    (username, password, done) => {
        User.findOne(
            { username: username.toLowerCase() },
            (err: NativeError, user: IUser) => {
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
    res.redirect('/login');
};
