"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileDetailsController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var get_profile_details_1 = require("../../use-cases/profile/get-profile-details");
var validate_request_param_1 = require("../../use-cases/validate-request-param");
var getProfileDetailsController = function (request) {
    return function_1.pipe(validate_request_param_1.validateRequestParamUseCase(request, 'userId'), extensions_1.toTaskEither, TaskEither_1.orElse(function () {
        return function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.map(function (user) { return user.userId; }));
    }), TaskEither_1.chain(function (userId) { return function_1.pipe(get_profile_details_1.getProfileDetailsUseCase(userId), extensions_1.toTaskEither); }), base_1.toResponse(false));
};
exports.getProfileDetailsController = getProfileDetailsController;
