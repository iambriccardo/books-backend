"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.AuthJwtStrategy = exports.AuthLocalStrategy = void 0;
var passport_local_1 = require("passport-local");
var user_1 = require("../entities/user");
var passport_jwt_1 = require("passport-jwt");
var environment_1 = require("./environment");
var passport_1 = require("passport");
var fromAuthHeaderAsBearerToken = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken;
exports.AuthLocalStrategy = new passport_local_1.Strategy({ usernameField: 'usernameOrEmail' }, function (usernameOrEmail, password, done) {
    // TODO: find way to use the interceptor to do this automatically.
    usernameOrEmail = usernameOrEmail.toLowerCase();
    user_1.UserModel.findOne({
        $or: [
            { username: usernameOrEmail },
            { email: usernameOrEmail },
        ],
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, {
                message: "Username/email " + usernameOrEmail + " not found.",
            });
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, {
                message: 'Invalid username/email or password.',
            });
        });
    });
});
exports.AuthJwtStrategy = new passport_jwt_1.Strategy({
    secretOrKey: environment_1.SECRET_KEY,
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
}, function (token, done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        user_1.UserModel.findOne({ userId: token.user.userId }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(undefined, false, {
                    message: "Username " + token.user.username + " not found.",
                });
            }
            return done(null, user);
        });
        return [2 /*return*/];
    });
}); });
exports.isAuthenticated = passport_1.authenticate('jwt', { session: false });
