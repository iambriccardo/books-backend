import { Strategy as LocalStrategy } from 'passport-local';
import { NativeError } from 'mongoose';
import { UserDocument, UserModel } from '../entities/user';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { SECRET_KEY } from './environment';
import { authenticate } from 'passport';
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;

export const AuthLocalStrategy = new LocalStrategy(
    { usernameField: 'usernameOrEmail' },
    (usernameOrEmail, password, done) => {
        UserModel.findOne(
            {
                $or: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail },
                ],
            },
            (err: NativeError, user: UserDocument) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(undefined, false, {
                        message: `Username/email ${usernameOrEmail} not found.`,
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
                            message: 'Invalid username/email or password.',
                        });
                    },
                );
            },
        );
    },
);

export const AuthJwtStrategy = new JwtStrategy(
    {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
        UserModel.findOne(
            { username: token.user.username },
            (err: NativeError, user: UserDocument) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(undefined, false, {
                        message: `Username ${token.user.username} not found.`,
                    });
                }

                return done(null, user);
            },
        );
    },
);

export const isAuthenticated = authenticate('jwt', { session: false });
