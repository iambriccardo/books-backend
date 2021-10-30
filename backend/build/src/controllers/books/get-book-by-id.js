"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookByIdController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var validate_request_param_1 = require("../../use-cases/validate-request-param");
var get_book_by_id_1 = require("../../use-cases/books/get-book-by-id");
var getBookByIdController = function (request) {
    return function_1.pipe(validate_request_param_1.validateRequestParamUseCase(request, 'bookId'), extensions_1.toTaskEither, TaskEither_1.chain(function (bookId) { return function_1.pipe(get_book_by_id_1.getBookByIdUseCase(bookId), extensions_1.toTaskEither); }), base_1.toResponse(false));
};
exports.getBookByIdController = getBookByIdController;
