"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var signup_1 = require("../../use-cases/authentication/signup/signup");
var sanitize_signup_1 = require("../../use-cases/authentication/signup/sanitize-signup");
var validate_request_body_1 = require("../../use-cases/validate-request-body");
var validate_signup_1 = require("../../use-cases/authentication/signup/validate-signup");
var SignupBodyJTDSchema = {
    properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
    },
};
var signupController = function (request) {
    return function_1.pipe(validate_request_body_1.validateRequestBodyUseCase(request, SignupBodyJTDSchema), extensions_1.toTaskEither, TaskEither_1.chain(function (body) { return function_1.pipe(sanitize_signup_1.sanitizeSignupUseCase(body), extensions_1.toTaskEither); }), TaskEither_1.chain(function (body) { return function_1.pipe(validate_signup_1.validateSignupUseCase(body), extensions_1.toTaskEither); }), TaskEither_1.chain(function (body) { return function_1.pipe(signup_1.signupUseCase(body), extensions_1.toTaskEither); }), base_1.toResponse(false));
};
exports.signupController = signupController;
