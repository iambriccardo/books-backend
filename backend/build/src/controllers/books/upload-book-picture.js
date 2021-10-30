"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBookPictureController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var convert_file_to_base64_1 = require("../../use-cases/convert-file-to-base64");
var TaskEither_1 = require("fp-ts/TaskEither");
var upload_picture_1 = require("../../use-cases/upload-picture");
var cloudinary_1 = require("../../helpers/cloudinary");
var uploadBookPictureController = function (request) {
    return function_1.pipe(convert_file_to_base64_1.convertFileToBase64UseCase(request, 'book-picture'), extensions_1.toTaskEither, TaskEither_1.chain(function (base64File) {
        return function_1.pipe(upload_picture_1.uploadPictureUseCase(base64File, cloudinary_1.imageOptions.bookPicture), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.uploadBookPictureController = uploadBookPictureController;
