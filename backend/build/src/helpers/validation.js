"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalCheckNonEmpty = exports.optionalCheckInArray = exports.optionalCheck = exports.checkNonEmpty = exports.checkInArray = exports.check = void 0;
var base_1 = require("../errors/base");
var validator_1 = __importDefault(require("validator"));
var check = function (field, block, value) {
    if (!block(value)) {
        throw new base_1.InvalidFieldFormatError(field);
    }
};
exports.check = check;
var checkInArray = function (field, value, array) {
    exports.check(field, function (innerValue) { return array.includes(innerValue); }, value);
};
exports.checkInArray = checkInArray;
var checkNonEmpty = function (field, value) {
    exports.check(field, function (val) { return !validator_1.default.isEmpty(val); }, value);
};
exports.checkNonEmpty = checkNonEmpty;
var optionalCheck = function (field, block, value) {
    if (value != null)
        exports.check(field, block, value);
};
exports.optionalCheck = optionalCheck;
var optionalCheckInArray = function (field, value, array) {
    exports.optionalCheck(field, function (innerValue) { return array.includes(innerValue); }, value);
};
exports.optionalCheckInArray = optionalCheckInArray;
var optionalCheckNonEmpty = function (field, value) {
    exports.optionalCheck(field, function (val) { return !validator_1.default.isEmpty(val); }, value);
};
exports.optionalCheckNonEmpty = optionalCheckNonEmpty;
