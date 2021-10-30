"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExistsError = exports.UserAlreadyExistsError = exports.TooManyRequestsError = exports.PasswordsEqualError = exports.PasswordsNotMatchingError = exports.GCPError = exports.CloudinaryError = exports.UnsupportedMediaTypeError = exports.AuthenticationError = exports.UnauthorizedError = exports.FileUploadError = exports.UserNotFoundError = exports.InvalidParamError = exports.UnauthenticatedUserError = exports.InvalidFieldFormatError = exports.InvalidBodyError = exports.ServerError = exports.AppError = exports.respondWithError = exports.errorToJsonResponse = exports.errorToStatusCode = void 0;
var http_status_codes_1 = require("http-status-codes");
var ERROR_TO_STATUS_CODE = {
    InvalidBodyError: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
    InvalidFieldFormatError: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
    InvalidParamError: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
    UnauthenticatedUserError: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    ServerError: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    UserNotFoundError: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    FileUploadError: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    UnauthorizedError: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    AuthenticationError: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    UnsupportedMediaTypeError: http_status_codes_1.StatusCodes.UNSUPPORTED_MEDIA_TYPE,
    CloudinaryError: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    GCPError: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    PasswordsNotMatchingError: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
    PasswordsEqualError: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
    TooManyRequestsError: http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS,
    UserAlreadyExistsError: 512,
    EmailAlreadyExistsError: 512,
};
var errorToStatusCode = function (error) {
    return (ERROR_TO_STATUS_CODE[error.type] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
};
exports.errorToStatusCode = errorToStatusCode;
var errorToJsonResponse = function (status, instance, error) {
    return {
        type: error.type,
        title: error.title,
        status: status,
        detail: error.detail,
        instance: instance,
    };
};
exports.errorToJsonResponse = errorToJsonResponse;
var respondWithError = function (req, res, error) {
    var statusCode = exports.errorToStatusCode(error);
    var body = exports.errorToJsonResponse(statusCode, req.originalUrl, error);
    res.status(statusCode).json(body);
};
exports.respondWithError = respondWithError;
var AppError = /** @class */ (function () {
    function AppError(type, title, detail) {
        this.type = type;
        this.title = title;
        this.detail = detail;
    }
    return AppError;
}());
exports.AppError = AppError;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(error) {
        return _super.call(this, 'ServerError', 'Server error', error) || this;
    }
    return ServerError;
}(AppError));
exports.ServerError = ServerError;
var InvalidBodyError = /** @class */ (function (_super) {
    __extends(InvalidBodyError, _super);
    function InvalidBodyError(message) {
        return _super.call(this, 'InvalidBodyError', 'Invalid body error', "The body of the request is not conforming to the defined schema: " + message) || this;
    }
    return InvalidBodyError;
}(AppError));
exports.InvalidBodyError = InvalidBodyError;
var InvalidFieldFormatError = /** @class */ (function (_super) {
    __extends(InvalidFieldFormatError, _super);
    function InvalidFieldFormatError(fieldName) {
        return _super.call(this, 'InvalidFieldFormatError', 'Invalid field format error', "The field " + fieldName + " has not the correct format") || this;
    }
    return InvalidFieldFormatError;
}(AppError));
exports.InvalidFieldFormatError = InvalidFieldFormatError;
var UnauthenticatedUserError = /** @class */ (function (_super) {
    __extends(UnauthenticatedUserError, _super);
    function UnauthenticatedUserError() {
        return _super.call(this, 'UnauthenticatedUserError', 'Unauthenticated user error', 'The user is not authenticated, thus this request cannot be authorized.') || this;
    }
    return UnauthenticatedUserError;
}(AppError));
exports.UnauthenticatedUserError = UnauthenticatedUserError;
var InvalidParamError = /** @class */ (function (_super) {
    __extends(InvalidParamError, _super);
    function InvalidParamError(paramName) {
        return _super.call(this, 'InvalidParamError', 'Invalid param error', "The parameter " + paramName + " is invalid or missing.") || this;
    }
    return InvalidParamError;
}(AppError));
exports.InvalidParamError = InvalidParamError;
var UserNotFoundError = /** @class */ (function (_super) {
    __extends(UserNotFoundError, _super);
    function UserNotFoundError(user) {
        return _super.call(this, 'UserNotFoundError', 'User not found error', "The user " + user + " doesn't exist.") || this;
    }
    return UserNotFoundError;
}(AppError));
exports.UserNotFoundError = UserNotFoundError;
var FileUploadError = /** @class */ (function (_super) {
    __extends(FileUploadError, _super);
    function FileUploadError(filename, error) {
        return _super.call(this, 'FileUploadError', 'File upload error', "The file " + filename + " cannot be uploaded because " + error + ".") || this;
    }
    return FileUploadError;
}(AppError));
exports.FileUploadError = FileUploadError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        return _super.call(this, 'UnauthorizedError', 'Unauthorized error', 'You are not authorized to perform this action.') || this;
    }
    return UnauthorizedError;
}(AppError));
exports.UnauthorizedError = UnauthorizedError;
var AuthenticationError = /** @class */ (function (_super) {
    __extends(AuthenticationError, _super);
    function AuthenticationError() {
        return _super.call(this, 'AuthenticationError', 'Authentication error', 'There was a problem with the authentication.') || this;
    }
    return AuthenticationError;
}(AppError));
exports.AuthenticationError = AuthenticationError;
var UnsupportedMediaTypeError = /** @class */ (function (_super) {
    __extends(UnsupportedMediaTypeError, _super);
    function UnsupportedMediaTypeError(supportedTypes) {
        return _super.call(this, 'UnsupportedMediaTypeError', 'Unsupported media type error', "Only " + supportedTypes.join(',') + " are supported.") || this;
    }
    return UnsupportedMediaTypeError;
}(AppError));
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;
var CloudinaryError = /** @class */ (function (_super) {
    __extends(CloudinaryError, _super);
    function CloudinaryError(message) {
        return _super.call(this, 'CloudinaryError', 'Cloudinary error', "An error occurred with Cloudinary: " + message) || this;
    }
    return CloudinaryError;
}(AppError));
exports.CloudinaryError = CloudinaryError;
var GCPError = /** @class */ (function (_super) {
    __extends(GCPError, _super);
    function GCPError(message) {
        return _super.call(this, 'GCPError', 'GCP error', "An error occurred with Google Cloud Platform: " + message) || this;
    }
    return GCPError;
}(AppError));
exports.GCPError = GCPError;
var PasswordsNotMatchingError = /** @class */ (function (_super) {
    __extends(PasswordsNotMatchingError, _super);
    function PasswordsNotMatchingError() {
        return _super.call(this, 'PasswordsNotMatchingError', 'Passwords not matching error', "The passwords are not matching.") || this;
    }
    return PasswordsNotMatchingError;
}(AppError));
exports.PasswordsNotMatchingError = PasswordsNotMatchingError;
var PasswordsEqualError = /** @class */ (function (_super) {
    __extends(PasswordsEqualError, _super);
    function PasswordsEqualError() {
        return _super.call(this, 'PasswordsEqualError', 'Passwords equal error', "The passwords are equal.") || this;
    }
    return PasswordsEqualError;
}(AppError));
exports.PasswordsEqualError = PasswordsEqualError;
var TooManyRequestsError = /** @class */ (function (_super) {
    __extends(TooManyRequestsError, _super);
    function TooManyRequestsError() {
        return _super.call(this, 'TooManyRequestsError', 'Too many requests error', "The number of requests made by this client exceeded the limit, try again later.") || this;
    }
    return TooManyRequestsError;
}(AppError));
exports.TooManyRequestsError = TooManyRequestsError;
var UserAlreadyExistsError = /** @class */ (function (_super) {
    __extends(UserAlreadyExistsError, _super);
    function UserAlreadyExistsError(username) {
        return _super.call(this, 'UserAlreadyExistsError', 'User already exists error', "The user " + username + " already exists, try another username.") || this;
    }
    return UserAlreadyExistsError;
}(AppError));
exports.UserAlreadyExistsError = UserAlreadyExistsError;
var EmailAlreadyExistsError = /** @class */ (function (_super) {
    __extends(EmailAlreadyExistsError, _super);
    function EmailAlreadyExistsError(email) {
        return _super.call(this, 'EmailAlreadyExistsError', 'Email already exists error', "The email " + email + " already exists, try another email.") || this;
    }
    return EmailAlreadyExistsError;
}(AppError));
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
