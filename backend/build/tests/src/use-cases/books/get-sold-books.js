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
var get_sold_books_1 = require("../../../../src/use-cases/books/get-sold-books");
var fixtures_1 = require("../../../helpers/fixtures");
chai_1.use(chai_as_promised_1.default);
mocha_1.describe('getSoldBooksUseCase', function () {
    before(mongoose_1.initTestMongoose);
    after(mongoose_1.destroyTestMongoose(book_1.BookModel));
    afterEach(mongoose_1.deleteCollections(book_1.BookModel));
    it('should return the books sold by the user if it has sold any', function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, useCase, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = fixtures_1.sellBookBodyFixture({
                            seller: '608e519d8c2f4a0a88aa8216',
                            saleDate: new Date(),
                            buyer: '608e4192842f4a0a88aa8216',
                        });
                        return [4 /*yield*/, sell_book_1.sellBookUseCase(body)()];
                    case 1:
                        _b.sent();
                        useCase = get_sold_books_1.getSoldBooksUseCase('608e519d8c2f4a0a88aa8216');
                        return [4 /*yield*/, chai_1.expect(useCase()).to.not.be.rejected];
                    case 2:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, useCase()];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.have.length.above(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('should return nothing if the user has not sold any books', function () {
        return __awaiter(this, void 0, void 0, function () {
            var useCase, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        useCase = get_sold_books_1.getSoldBooksUseCase('608e519d8c2f4a0a88aa8216');
                        return [4 /*yield*/, chai_1.expect(useCase()).to.not.be.rejected];
                    case 1:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, useCase()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.have.length.below(1);
                        return [2 /*return*/];
                }
            });
        });
    });
});
