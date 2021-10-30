"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellBookController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var sell_book_1 = require("../../use-cases/books/sell-book/sell-book");
var validate_request_body_1 = require("../../use-cases/validate-request-body");
var TaskEither_1 = require("fp-ts/TaskEither");
var validate_sell_book_1 = require("../../use-cases/books/sell-book/validate-sell-book");
var Apply_1 = require("fp-ts/Apply");
var get_all_currencies_1 = require("../../use-cases/currencies/get-all-currencies");
var SellBookBodyJTDSchemaType = {
    properties: {
        isbn: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        currency: { type: 'string' },
        amount: { type: 'float32' },
        condition: { enum: ['bad', 'ok', 'good', 'great', 'na'] },
        pictures: {
            elements: {
                type: 'string',
            },
        },
        publicationDate: { type: 'timestamp' },
        seller: { type: 'string' },
        locationName: { type: 'string' },
        locationLatitude: { type: 'float32' },
        locationLongitude: { type: 'float32' },
    },
};
var sellBookController = function (request) {
    return function_1.pipe(Apply_1.sequenceT(TaskEither_1.taskEither)(function_1.pipe(validate_request_body_1.validateRequestBodyUseCase(request, SellBookBodyJTDSchemaType), extensions_1.toTaskEither), function_1.pipe(get_all_currencies_1.getAllCurrenciesUseCase(), extensions_1.toTaskEither)), TaskEither_1.chain(function (_a) {
        var body = _a[0], currencies = _a[1];
        return function_1.pipe(validate_sell_book_1.validateSellBookUseCase(body, currencies), extensions_1.toTaskEither);
    }), TaskEither_1.chain(function (body) { return function_1.pipe(sell_book_1.sellBookUseCase(body), extensions_1.toTaskEither); }), base_1.toResponse(false));
};
exports.sellBookController = sellBookController;
