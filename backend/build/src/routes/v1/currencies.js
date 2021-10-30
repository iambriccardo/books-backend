"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var base_1 = require("../../controllers/base");
var authentication_1 = require("../../helpers/authentication");
var get_all_currencies_1 = require("../../controllers/currencies/get-all-currencies");
var router = express_1.Router();
router.get('/all', authentication_1.isAuthenticated, base_1.connectsToController(get_all_currencies_1.getAllCurrenciesController));
exports.default = router;
