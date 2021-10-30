"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var sell_book_1 = require("../../../../src/use-cases/books/sell-book/sell-book");
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var book_1 = require("../../../../src/entities/book");
var mongoose_1 = require("../../../helpers/mongoose");
var fixtures_1 = require("../../../helpers/fixtures");
var remove_book_1 = require("../../../../src/use-cases/books/remove-book");
var create_transaction_1 = require("../../../../src/use-cases/books/create-transaction");
var transaction_1 = require("../../../../src/entities/transaction");
chai_1.use(chai_as_promised_1.default);
mocha_1.describe('removeBookUseCase', function () {
    before(mongoose_1.initTestMongoose);
    after(mongoose_1.destroyTestMongoose(book_1.BookModel, transaction_1.TransactionModel));
    afterEach(mongoose_1.deleteCollections(book_1.BookModel, transaction_1.TransactionModel));
    it('should remove the book if the seller has uploaded that book', function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, book, useCase, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = fixtures_1.sellBookBodyFixture({
                            seller: '608e519d8c2f4a0a88aa8216',
                        });
                        return [4 /*yield*/, sell_book_1.sellBookUseCase(body)()];
                    case 1:
                        book = _b.sent();
                        useCase = remove_book_1.removeBookUseCase('608e519d8c2f4a0a88aa8216', book.bookId);
                        return [4 /*yield*/, chai_1.expect(useCase()).to.not.be.rejected];
                    case 2:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, book_1.BookModel.findOne({ bookId: book.bookId })];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.not.exist;
                        return [2 /*return*/];
                }
            });
        });
    });
    it('should remove the book and the transaction if the seller has uploaded that book and created a transaction', function () {
        return __awaiter(this, void 0, void 0, function () {
            var book, transaction, useCase, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, sell_book_1.sellBookUseCase(fixtures_1.sellBookBodyFixture({
                            seller: '608e519d8c2f4a0a88aa8216',
                        }))()];
                    case 1:
                        book = _c.sent();
                        return [4 /*yield*/, create_transaction_1.createTransactionUseCase(book.bookId)()];
                    case 2:
                        transaction = _c.sent();
                        useCase = remove_book_1.removeBookUseCase('608e519d8c2f4a0a88aa8216', book.bookId);
                        return [4 /*yield*/, chai_1.expect(useCase()).to.not.be.rejected];
                    case 3:
                        _c.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, transaction_1.TransactionModel.findOne({
                                transactionId: transaction.transactionId,
                            })];
                    case 4:
                        _a.apply(void 0, [_c.sent()]).to.not.exist;
                        _b = chai_1.expect;
                        return [4 /*yield*/, book_1.BookModel.findOne({ bookId: book.bookId })];
                    case 5:
                        _b.apply(void 0, [_c.sent()]).to.not.exist;
                        return [2 /*return*/];
                }
            });
        });
    });
    it('should not remove the book if the seller has not uploaded that book', function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, book, useCase, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = fixtures_1.sellBookBodyFixture({
                            seller: '608e519d8c2f4a0a88aa8216',
                        });
                        return [4 /*yield*/, sell_book_1.sellBookUseCase(body)()];
                    case 1:
                        book = _b.sent();
                        useCase = remove_book_1.removeBookUseCase('508234e19d8c2f4a0a88aa8216', book.bookId);
                        return [4 /*yield*/, chai_1.expect(useCase()).to.not.be.rejected];
                    case 2:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, book_1.BookModel.findOne({ bookId: book.bookId })];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.exist;
                        return [2 /*return*/];
                }
            });
        });
    });
});
