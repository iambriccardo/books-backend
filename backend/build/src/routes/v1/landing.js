"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var base_1 = require("../../controllers/base");
var search_books_1 = require("../../controllers/books/search-books");
var interceptors_1 = require("../../interceptors/interceptors");
var router = express_1.Router();
router.get('/search', base_1.connectsToController(search_books_1.searchBooksController, interceptors_1.useInjectQueryParameter('limit', '15')));
exports.default = router;
