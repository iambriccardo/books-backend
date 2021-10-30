"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProfilePictureController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var add_profile_picture_1 = require("../../use-cases/profile/add-profile-picture");
var delete_picture_1 = require("../../use-cases/delete-picture");
var remove_profile_picture_1 = require("../../use-cases/profile/remove-profile-picture");
var removeProfilePictureController = function (request) {
    return function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.chain(function (user) {
        return function_1.pipe(remove_profile_picture_1.removeProfilePictureUseCase(user.username), extensions_1.toTaskEither, TaskEither_1.orElse(function () {
            return function_1.pipe(add_profile_picture_1.addProfilePictureUseCase(user.username, user.profilePicture), extensions_1.toTaskEither);
        }), TaskEither_1.map(function () { return user; }));
    }), TaskEither_1.chain(function (user) {
        return function_1.pipe(delete_picture_1.deletePictureUseCase(user.profilePicture), extensions_1.toTaskEither, TaskEither_1.orElse(function () {
            return function_1.pipe(add_profile_picture_1.addProfilePictureUseCase(user.username, user.profilePicture), extensions_1.toTaskEither);
        }));
    }), base_1.toResponse(false));
};
exports.removeProfilePictureController = removeProfilePictureController;
