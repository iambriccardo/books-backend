"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authentication_1 = __importDefault(require("./authentication"));
var books_1 = __importDefault(require("./books"));
var currencies_1 = __importDefault(require("./currencies"));
var landing_1 = __importDefault(require("./landing"));
var profile_1 = __importDefault(require("./profile"));
var router = express_1.Router();
router.use('/auth', authentication_1.default);
router.use('/books', books_1.default);
router.use('/currencies', currencies_1.default);
router.use('/landing', landing_1.default);
router.use('/profile', profile_1.default);
exports.default = router;
