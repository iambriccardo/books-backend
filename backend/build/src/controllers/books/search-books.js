"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBooksController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var search_books_1 = require("../../use-cases/books/search-books");
var TaskEither_1 = require("fp-ts/TaskEither");
var Apply_1 = require("fp-ts/Apply");
var validate_request_query_param_1 = require("../../use-cases/validate-request-query-param");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var searchBooksController = function (request) {
    return function_1.pipe(Apply_1.sequenceT(TaskEither_1.taskEither)(function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.map(function (user) { return user.userId; }), TaskEither_1.orElse(function () { return function_1.pipe(extensions_1.withValue(''), extensions_1.toTaskEither); })), function_1.pipe(validate_request_query_param_1.validateRequestQueryParam(request, 'searchQuery'), extensions_1.toTaskEither), function_1.pipe(validate_request_query_param_1.validateRequestQueryParam(request, 'limit'), extensions_1.toTaskEither, TaskEither_1.map(function (limit) { return Number(limit); }), TaskEither_1.orElse(function () { return function_1.pipe(extensions_1.withValue(0), extensions_1.toTaskEither); }))), TaskEither_1.chain(function (_a) {
        var userId = _a[0], query = _a[1], limit = _a[2];
        return function_1.pipe(search_books_1.searchBooksUseCase(query, limit, userId), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.searchBooksController = searchBooksController;
