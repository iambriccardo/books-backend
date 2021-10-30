"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyFixture = exports.sellBookBodyFixture = void 0;
var sellBookBodyFixture = function (extraParams) {
    if (extraParams === void 0) { extraParams = {}; }
    return __assign({ isbn: '978-1-56619-909-4', title: 'Alice in Wonderland', description: 'Alice in Wonderland has been known for its curious story.', currency: '$', amount: 20, condition: 'ok', pictures: ['https://cloudinary.com/alice_in_wonderland.png'], publicationDate: new Date(), seller: '608e519d8c2f4a0a88aa8216', locationName: 'Trento', locationLatitude: 46.0747793, locationLongitude: 11.3547582 }, extraParams);
};
exports.sellBookBodyFixture = sellBookBodyFixture;
var currencyFixture = function (extraParams) {
    if (extraParams === void 0) { extraParams = {}; }
    return __assign({ symbol: '$', name: 'US Dollar' }, extraParams);
};
exports.currencyFixture = currencyFixture;
