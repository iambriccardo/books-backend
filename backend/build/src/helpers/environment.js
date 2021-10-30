"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELL_BOOK_CONFIRM_BASE_URL = exports.GCP_API_KEY = exports.ENABLE_LOGGING = exports.SECRET_KEY = exports.MONGO_DB_URL = exports.PORT = exports.DEBUG = exports.APP_NAME = exports.API_VERSION = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
if (process.env.MODE == 'production') {
    console.log('Loading production .env file.');
    dotenv_1.default.config({ path: '.env.prod' });
}
else if (process.env.MODE == 'development') {
    console.log('Loading development .env file.');
    dotenv_1.default.config({ path: '.env.dev' });
}
exports.API_VERSION = 'v1';
exports.APP_NAME = process.env.APP_NAME || 'books';
exports.DEBUG = process.env.DEBUG === 'true';
exports.PORT = process.env.PORT || 3000;
exports.MONGO_DB_URL = process.env.MONGO_DB_URL || '';
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.ENABLE_LOGGING = process.env.ENABLE_LOGGING === 'true';
exports.GCP_API_KEY = process.env.GCP_API_KEY;
exports.SELL_BOOK_CONFIRM_BASE_URL = process.env
    .SELL_BOOK_CONFIRM_BASE_URL;
