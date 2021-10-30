"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var validate_request_body_1 = require("../../use-cases/validate-request-body");
var change_password_1 = require("../../use-cases/authentication/change-password/change-password");
var Apply_1 = require("fp-ts/Apply");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var sanitize_change_password_1 = require("../../use-cases/authentication/change-password/sanitize-change-password");
var validate_change_password_1 = require("../../use-cases/authentication/change-password/validate-change-password");
var ChangePasswordJTDSchema = {
    properties: {
        oldPassword: { type: 'string' },
        newPassword: { type: 'string' },
    },
};
var changePasswordController = function (request) {
    return function_1.pipe(Apply_1.sequenceT(TaskEither_1.taskEither)(function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.map(function (user) { return user.userId; })), function_1.pipe(validate_request_body_1.validateRequestBodyUseCase(request, ChangePasswordJTDSchema), extensions_1.toTaskEither)), TaskEither_1.chain(function (_a) {
        var userId = _a[0], body = _a[1];
        return function_1.pipe(sanitize_change_password_1.sanitizeChangePasswordUseCase(body), extensions_1.toTaskEither, TaskEither_1.map(function (sanitizedBody) {
            return [userId, sanitizedBody];
        }));
    }), TaskEither_1.chain(function (_a) {
        var userId = _a[0], body = _a[1];
        return function_1.pipe(validate_change_password_1.validateChangePasswordUseCase(userId, body), extensions_1.toTaskEither, TaskEither_1.map(function (validatedBody) {
            return [userId, validatedBody];
        }));
    }), TaskEither_1.chain(function (_a) {
        var userId = _a[0], body = _a[1];
        return function_1.pipe(change_password_1.changePasswordUseCase(userId, body), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.changePasswordController = changePasswordController;
