"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePictureController = void 0;
var base_1 = require("../base");
var base_2 = require("../../errors/base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var convert_file_to_base64_1 = require("../../use-cases/convert-file-to-base64");
var TaskEither_1 = require("fp-ts/TaskEither");
var upload_picture_1 = require("../../use-cases/upload-picture");
var cloudinary_1 = require("../../helpers/cloudinary");
var Apply_1 = require("fp-ts/Apply");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var add_profile_picture_1 = require("../../use-cases/profile/add-profile-picture");
var delete_picture_1 = require("../../use-cases/delete-picture");
var uploadProfilePictureController = function (request) {
    return function_1.pipe(convert_file_to_base64_1.convertFileToBase64UseCase(request, 'profile-picture'), extensions_1.toTaskEither, TaskEither_1.chain(function (base64File) {
        // TODO: the TaskEither are run in parallel, thus their errors are independent, fix this.
        return Apply_1.sequenceT(TaskEither_1.taskEither)(function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.map(function (user) { return user.userId; })), function_1.pipe(upload_picture_1.uploadPictureUseCase(base64File, cloudinary_1.imageOptions.profilePicture), extensions_1.toTaskEither));
    }), TaskEither_1.chain(function (_a) {
        var userId = _a[0], uploadResult = _a[1];
        return function_1.pipe(add_profile_picture_1.addProfilePictureUseCase(userId, uploadResult.secureUrl), extensions_1.toTaskEither, TaskEither_1.map(function () { return uploadResult; }), TaskEither_1.orElse(function () {
            return function_1.pipe(delete_picture_1.deletePictureUseCase(uploadResult.publicId), extensions_1.toTaskEither, TaskEither_1.chain(function () {
                return function_1.pipe(extensions_1.withError(new base_2.ServerError('Error while uploading the profile picture.')), extensions_1.toTaskEither);
            }));
        }));
    }), base_1.toResponse(false));
};
exports.uploadProfilePictureController = uploadProfilePictureController;
