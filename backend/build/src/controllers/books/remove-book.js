"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBookController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var TaskEither_1 = require("fp-ts/TaskEither");
var validate_request_param_1 = require("../../use-cases/validate-request-param");
var Apply_1 = require("fp-ts/Apply");
var get_user_from_request_1 = require("../../use-cases/get-user-from-request");
var remove_book_1 = require("../../use-cases/books/remove-book");
var removeBookController = function (request) {
    return function_1.pipe(Apply_1.sequenceT(TaskEither_1.taskEither)(function_1.pipe(get_user_from_request_1.getUserFromRequestUseCase(request), extensions_1.toTaskEither), function_1.pipe(validate_request_param_1.validateRequestParamUseCase(request, 'bookId'), extensions_1.toTaskEither)), TaskEither_1.chain(function (_a) {
        var seller = _a[0], bookId = _a[1];
        return function_1.pipe(remove_book_1.removeBookUseCase(seller.userId, bookId), extensions_1.toTaskEither);
    }), base_1.toResponse(false));
};
exports.removeBookController = removeBookController;
