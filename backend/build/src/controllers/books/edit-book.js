"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBookController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var validate_request_body_1 = require("../../use-cases/validate-request-body");
var TaskEither_1 = require("fp-ts/TaskEither");
var edit_book_1 = require("../../use-cases/books/edit-book/edit-book");
var Apply_1 = require("fp-ts/Apply");
var validate_request_param_1 = require("../../use-cases/validate-request-param");
var validate_edit_book_1 = require("../../use-cases/books/edit-book/validate-edit-book");
var get_all_currencies_1 = require("../../use-cases/currencies/get-all-currencies");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var EditBookBodyJTDSchemaType = {
    optionalProperties: {
        description: { type: 'string' },
        currency: { type: 'string' },
        amount: { type: 'float32' },
        condition: { enum: ['bad', 'ok', 'good', 'great', 'na'] },
        pictures: {
            elements: {
                type: 'string',
            },
        },
    },
};
var editBookController = function (request) {
    return function_1.pipe(Apply_1.sequenceT(TaskEither_1.taskEither)(function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.map(function (user) { return user.userId; })), function_1.pipe(validate_request_param_1.validateRequestParamUseCase(request, 'bookId'), extensions_1.toTaskEither), function_1.pipe(validate_request_body_1.validateRequestBodyUseCase(request, EditBookBodyJTDSchemaType), extensions_1.toTaskEither), function_1.pipe(get_all_currencies_1.getAllCurrenciesUseCase(), extensions_1.toTaskEither)), TaskEither_1.chain(function (_a) {
        var userId = _a[0], bookId = _a[1], body = _a[2], currencies = _a[3];
        return function_1.pipe(validate_edit_book_1.validateEditBookUseCase(body, currencies), extensions_1.toTaskEither, TaskEither_1.map(function () {
            return [userId, bookId, body];
        }));
    }), TaskEither_1.chain(function (_a) {
        var userId = _a[0], bookId = _a[1], body = _a[2];
        return function_1.pipe(edit_book_1.editBookUseCase(userId, bookId, body), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.editBookController = editBookController;
