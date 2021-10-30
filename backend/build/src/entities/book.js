"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
var mongoose_1 = require("mongoose");
var utils_1 = require("../helpers/utils");
var BookSchema = new mongoose_1.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return new mongoose_1.Types.ObjectId(); },
    },
    searchableIsbn: {
        type: [String],
        required: false,
        index: true,
        select: false,
    },
    isbn: { type: String, required: true },
    searchableTitle: {
        type: [String],
        required: false,
        index: true,
        select: false,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    currency: { type: String, required: true },
    amount: { type: Number, required: true },
    condition: {
        type: String,
        enum: ['bad', 'ok', 'good', 'great', 'na'],
        default: 'na',
        required: true,
    },
    pictures: { type: [String], required: true },
    publicationDate: { type: Date, required: true },
    seller: { type: String, required: true },
    locationName: { type: String, required: true },
    locationLatitude: { type: Number, required: true },
    locationLongitude: { type: Number, required: true },
    saleDate: { type: Date, required: false },
    buyer: { type: String, required: false },
}, {
    versionKey: false,
}).index({
    isbn: 'text',
    title: 'text',
    description: 'text',
});
BookSchema.pre('save', function (next) {
    var book = this;
    book.searchableIsbn = utils_1.createEdgeNGrams(book.isbn);
    book.searchableTitle = utils_1.createEdgeNGrams(book.title);
    next();
});
exports.BookModel = mongoose_1.model('Book', BookSchema);
