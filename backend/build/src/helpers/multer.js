"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptsFileArray = exports.acceptsSingleFile = exports.supportedTypes = void 0;
var multer_1 = __importDefault(require("multer"));
var logging_1 = require("./logging");
var base_1 = require("../errors/base");
var mongoose_1 = require("mongoose");
exports.supportedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
var upload = multer_1.default({
    limits: {
        // We limit the file size to 5MB (5000000 bytes).
        fileSize: 5000000,
    },
    fileFilter: function (req, file, cb) {
        if (exports.supportedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new mongoose_1.Error('UnsupportedMediaType'));
        }
    },
});
var handleMulterError = function (req, res, next, error, filename) {
    if (error) {
        var appError = deriveAppError(filename, error);
        var statusCode = base_1.errorToStatusCode(appError);
        logging_1.logger.warn("An error occurred in multer while reading file " + filename + " because " + error);
        res.status(statusCode).json(base_1.errorToJsonResponse(statusCode, req.originalUrl, appError));
    }
    else {
        next();
    }
};
var deriveAppError = function (filename, error) {
    if (error instanceof mongoose_1.Error) {
        if (error.message === 'UnsupportedMediaType')
            return new base_1.UnsupportedMediaTypeError(exports.supportedTypes);
    }
    return new base_1.FileUploadError(filename, error);
};
var acceptsSingleFile = function (filename) {
    return function (req, res, next) {
        return upload.single(filename)(req, res, function (err) {
            return handleMulterError(req, res, next, err, filename);
        });
    };
};
exports.acceptsSingleFile = acceptsSingleFile;
var acceptsFileArray = function (filename, maxCount) {
    return function (req, res, next) {
        return upload.array(filename, maxCount)(req, res, function (err) {
            return handleMulterError(req, res, next, err, filename);
        });
    };
};
exports.acceptsFileArray = acceptsFileArray;
