"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
var mongoose_1 = require("mongoose");
var connectToMongo = function (url) {
    return mongoose_1.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        // We wait 5 seconds before throwing a server selection error.
        serverSelectionTimeoutMS: 5000,
    });
};
exports.connectToMongo = connectToMongo;
