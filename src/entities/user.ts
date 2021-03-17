import { Document, Error, model, Model, Schema } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt-nodejs';

export interface IUserBase {
    username: string;
    password: string;
}

export interface IUser extends IUserBase, Document {
    name: string;
    surname: string;
    contactInformation: {
        phoneNumber: string;
        email: string;
        telegramUsername: string;
        facebookUsername: string;
    };
    comparePassword: ComparePasswordFunction;
}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        contactInformation: {
            phoneNumber: { type: String, required: true, unique: true },
            email: { type: String, required: true, unique: true },
            telegramUsername: String,
            facebookUsername: String,
        },
    },
    {
        versionKey: false,
    },
);

UserSchema.pre('save', function save(next) {
    const user = this as IUser;
    if (!user.isModified('password')) return next();

    genSalt(10, (err, salt) => {
        if (err) return next(err);

        hash(user.password, salt, null, (err: Error, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

type ComparePasswordFunction = (
    candidatePassword: string,
    cb: (err: any, isMatch: any) => void,
) => void;

const comparePassword: ComparePasswordFunction = function (
    candidatePassword,
    cb,
) {
    compare(
        candidatePassword,
        this.password,
        (err: Error, isMatch: boolean) => {
            cb(err, isMatch);
        },
    );
};

UserSchema.methods.comparePassword = comparePassword;

export const User: Model<IUser> = model('User', UserSchema);
