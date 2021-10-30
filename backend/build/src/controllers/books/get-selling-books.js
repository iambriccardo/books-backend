"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellingBooksController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var get_selling_books_1 = require("../../use-cases/books/get-selling-books");
var getSellingBooksController = function (request) {
    return function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.chain(function (user) {
        return function_1.pipe(get_selling_books_1.getSellingBooksUseCase(user.userId), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.getSellingBooksController = getSellingBooksController;
