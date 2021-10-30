"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exploreBooksController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var explore_books_1 = require("../../use-cases/books/explore-books");
var extensions_1 = require("../../helpers/extensions");
var Apply_1 = require("fp-ts/Apply");
var TaskEither_1 = require("fp-ts/TaskEither");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var shuffle_books_1 = require("../../use-cases/books/shuffle-books");
var exploreBooksController = function (request) {
    return function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither, TaskEither_1.chain(function (user) {
        return Apply_1.sequenceT(TaskEither_1.taskEither)(function_1.pipe(shuffle_books_1.shuffleBooksUseCase(user.userId), extensions_1.toTaskEither), function_1.pipe(shuffle_books_1.shuffleBooksUseCase(user.userId), extensions_1.toTaskEither), function_1.pipe(shuffle_books_1.shuffleBooksUseCase(user.userId), extensions_1.toTaskEither));
    }), TaskEither_1.chain(function (_a) {
        var popularBooks = _a[0], mayInterestYouBooks = _a[1], recentlyViewedBooks = _a[2];
        return function_1.pipe(explore_books_1.exploreBooksUseCase(popularBooks, mayInterestYouBooks, recentlyViewedBooks), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.exploreBooksController = exploreBooksController;
