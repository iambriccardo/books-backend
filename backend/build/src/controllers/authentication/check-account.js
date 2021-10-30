"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccountController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var validate_request_body_1 = require("../../use-cases/validate-request-body");
var check_account_1 = require("../../use-cases/authentication/check-account");
var CheckAccountJTDSchemaType = {
    properties: {
        usernameOrEmail: { type: 'string' },
    },
};
var checkAccountController = function (request) {
    return function_1.pipe(validate_request_body_1.validateRequestBodyUseCase(request, CheckAccountJTDSchemaType), extensions_1.toTaskEither, TaskEither_1.chain(function (body) {
        return function_1.pipe(check_account_1.checkAccountUseCase(body.usernameOrEmail), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.checkAccountController = checkAccountController;
