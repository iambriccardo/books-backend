"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
var mongoose_1 = require("mongoose");
var TransactionSchema = new mongoose_1.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return new mongoose_1.Types.ObjectId(); },
    },
    bookId: { type: String, required: true, unique: true },
}, {
    versionKey: false,
});
exports.TransactionModel = mongoose_1.model('Transaction', TransactionSchema);
