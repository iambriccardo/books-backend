"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var validate_request_body_1 = require("../../use-cases/validate-request-body");
var edit_profile_1 = require("../../use-cases/profile/edit-profile/edit-profile");
var Apply_1 = require("fp-ts/Apply");
var validate_edit_profile_1 = require("../../use-cases/profile/edit-profile/validate-edit-profile");
var EditProfileBodyJTDSchema = {
    optionalProperties: {
        email: { type: 'string' },
        name: { type: 'string' },
        surname: { type: 'string' },
        contactInformation: {
            optionalProperties: {
                phoneNumber: { type: 'string' },
                telegramUsername: { type: 'string' },
                facebookUsername: { type: 'string' },
            },
        },
    },
};
var editProfileController = function (request) {
    return function_1.pipe(Apply_1.sequenceT(TaskEither_1.taskEither)(function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.map(function (user) { return user.userId; })), function_1.pipe(validate_request_body_1.validateRequestBodyUseCase(request, EditProfileBodyJTDSchema), extensions_1.toTaskEither)), TaskEither_1.chain(function (_a) {
        var userId = _a[0], body = _a[1];
        return function_1.pipe(validate_edit_profile_1.validateEditProfileUseCase(body), extensions_1.toTaskEither, TaskEither_1.map(function () { return [userId, body]; }));
    }), TaskEither_1.chain(function (_a) {
        var userId = _a[0], body = _a[1];
        return function_1.pipe(edit_profile_1.editProfileUseCase(userId, body), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.editProfileController = editProfileController;
