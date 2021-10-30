"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var login_1 = require("../../use-cases/authentication/login/login");
var TaskEither_1 = require("fp-ts/TaskEither");
var validate_request_body_1 = require("../../use-cases/validate-request-body");
var extensions_1 = require("../../helpers/extensions");
var LoginBodyJTDSchema = {
    properties: {
        usernameOrEmail: { type: 'string' },
        password: { type: 'string' },
    },
};
var loginController = function (request) {
    return function_1.pipe(validate_request_body_1.validateRequestBodyUseCase(request, LoginBodyJTDSchema), extensions_1.toTaskEither, TaskEither_1.chain(function () { return function_1.pipe(login_1.loginUseCase(request.context), extensions_1.toTaskEither); }), base_1.toResponse(true));
};
exports.loginController = loginController;
