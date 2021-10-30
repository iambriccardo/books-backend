"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookByTransactionController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var validate_request_param_1 = require("../../use-cases/validate-request-param");
var get_book_by_transaction_1 = require("../../use-cases/books/get-book-by-transaction");
var getBookByTransactionController = function (request) {
    return function_1.pipe(validate_request_param_1.validateRequestParamUseCase(request, 'transactionId'), extensions_1.toTaskEither, TaskEither_1.chain(function (transactionId) {
        return function_1.pipe(get_book_by_transaction_1.getBookByTransactionUseCase(transactionId), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.getBookByTransactionController = getBookByTransactionController;
