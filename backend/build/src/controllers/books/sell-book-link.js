"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellBookLinkController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var validate_request_param_1 = require("../../use-cases/validate-request-param");
var get_transaction_1 = require("../../use-cases/books/get-transaction");
var create_transaction_1 = require("../../use-cases/books/create-transaction");
var sell_book_link_1 = require("../../use-cases/books/sell-book-link");
var environment_1 = require("../../helpers/environment");
var sellBookLinkController = function (request) {
    return function_1.pipe(validate_request_param_1.validateRequestParamUseCase(request, 'bookId'), extensions_1.toTaskEither, TaskEither_1.chain(function (bookId) {
        return function_1.pipe(get_transaction_1.getTransactionUseCase(bookId), extensions_1.toTaskEither, TaskEither_1.orElse(function () {
            return function_1.pipe(create_transaction_1.createTransactionUseCase(bookId), extensions_1.toTaskEither);
        }));
    }), TaskEither_1.chain(function (transaction) {
        return function_1.pipe(sell_book_link_1.sellBookLinkUseCase(environment_1.SELL_BOOK_CONFIRM_BASE_URL, transaction), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.sellBookLinkController = sellBookLinkController;
