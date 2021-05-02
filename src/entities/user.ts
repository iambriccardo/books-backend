import { Document, Error, model, Model, Schema, Types } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt-nodejs';

export interface User {
    userId: string;
    email: string;
    username: string;
    password: string;
    name?: string;
    surname?: string;
    contactInformation: {
        phoneNumber?: string;
        telegramUsername?: string;
        facebookUsername?: string;
    };
    profilePicture?: string;
}

export interface UserDocument extends User, Document {
    comparePassword: ComparePasswordFunction;
}

const UserSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            default: () => new Types.ObjectId(),
        },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        name: String,
        surname: String,
        contactInformation: {
            phoneNumber: String,
            telegramUsername: String,
            facebookUsername: String,
        },
        profilePicture: String,
    },
    {
        versionKey: false,
    },
);

UserSchema.pre('save', function save(next) {
    const user = this as UserDocument;
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
    this: UserDocument,
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

export const UserModel: Model<UserDocument> = model('User', UserSchema);
