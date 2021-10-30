"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_nodejs_1 = require("bcrypt-nodejs");
var UserSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return new mongoose_1.Types.ObjectId(); },
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
}, {
    versionKey: false,
});
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt_nodejs_1.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        bcrypt_nodejs_1.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
var comparePassword = function (candidatePassword, cb) {
    bcrypt_nodejs_1.compare(candidatePassword, this.password, function (err, isMatch) {
        cb(err, isMatch);
    });
};
var comparePasswordSync = function (candidatePassword) {
    return bcrypt_nodejs_1.compareSync(candidatePassword, this.password);
};
UserSchema.methods.comparePassword = comparePassword;
UserSchema.methods.comparePasswordSync = comparePasswordSync;
exports.UserModel = mongoose_1.model('User', UserSchema);
