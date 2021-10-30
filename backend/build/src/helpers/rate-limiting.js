"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRateLimiter = void 0;
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var base_1 = require("../errors/base");
exports.defaultRateLimiter = express_rate_limit_1.default({
    windowMs: 60 * 1000,
    max: 500,
    handler: function (req, res, next) {
        base_1.respondWithError(req, res, new base_1.TooManyRequestsError());
    },
});
