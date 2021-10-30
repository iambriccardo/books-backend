"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCurrenciesController = void 0;
var base_1 = require("../base");
var function_1 = require("fp-ts/function");
var extensions_1 = require("../../helpers/extensions");
var get_all_currencies_1 = require("../../use-cases/currencies/get-all-currencies");
var getAllCurrenciesController = function (_) {
    return function_1.pipe(get_all_currencies_1.getAllCurrenciesUseCase(), extensions_1.toTaskEither, base_1.toResponse(false));
};
exports.getAllCurrenciesController = getAllCurrenciesController;
