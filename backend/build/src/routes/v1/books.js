"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var base_1 = require("../../controllers/base");
var sell_book_1 = require("../../controllers/books/sell-book");
var authentication_1 = require("../../helpers/authentication");
var explore_books_1 = require("../../controllers/books/explore-books");
var interceptors_1 = require("../../interceptors/interceptors");
var search_books_1 = require("../../controllers/books/search-books");
var get_selling_books_1 = require("../../controllers/books/get-selling-books");
var get_sold_books_1 = require("../../controllers/books/get-sold-books");
var remove_book_1 = require("../../controllers/books/remove-book");
var edit_book_1 = require("../../controllers/books/edit-book");
var multer_1 = require("../../helpers/multer");
var upload_book_picture_1 = require("../../controllers/books/upload-book-picture");
var sell_book_link_1 = require("../../controllers/books/sell-book-link");
var sell_book_confirm_1 = require("../../controllers/books/sell-book-confirm");
var get_book_by_transaction_1 = require("../../controllers/books/get-book-by-transaction");
var get_book_by_id_1 = require("../../controllers/books/get-book-by-id");
var router = express_1.Router();
router.put('/edit/:bookId', authentication_1.isAuthenticated, base_1.connectsToController(edit_book_1.editBookController));
router.get('/explore', authentication_1.isAuthenticated, base_1.connectsToController(explore_books_1.exploreBooksController));
router.get('/by-id/:bookId', authentication_1.isAuthenticated, base_1.connectsToController(get_book_by_id_1.getBookByIdController));
router.get('/by-transaction/:transactionId', authentication_1.isAuthenticated, base_1.connectsToController(get_book_by_transaction_1.getBookByTransactionController));
router.get('/selling', authentication_1.isAuthenticated, base_1.connectsToController(get_selling_books_1.getSellingBooksController));
router.get('/sold', authentication_1.isAuthenticated, base_1.connectsToController(get_sold_books_1.getSoldBookController));
router.delete('/remove/:bookId', authentication_1.isAuthenticated, base_1.connectsToController(remove_book_1.removeBookController));
router.get('/search', authentication_1.isAuthenticated, base_1.connectsToController(search_books_1.searchBooksController));
router.post('/sell', authentication_1.isAuthenticated, base_1.connectsToController(sell_book_1.sellBookController, interceptors_1.useInjectIntoRequestBody('publicationDate', new Date()), interceptors_1.useInjectUserIntoRequestBody('seller'), interceptors_1.useInjectLocationCoordinatesIntoRequestBody()));
router.post('/sell/confirm/:transactionId', authentication_1.isAuthenticated, base_1.connectsToController(sell_book_confirm_1.sellBookConfirmController));
router.get('/sell/link/:bookId', authentication_1.isAuthenticated, base_1.connectsToController(sell_book_link_1.sellBookLinkController));
router.post('/picture/upload', authentication_1.isAuthenticated, multer_1.acceptsSingleFile('book-picture'), base_1.connectsToController(upload_book_picture_1.uploadBookPictureController));
exports.default = router;
