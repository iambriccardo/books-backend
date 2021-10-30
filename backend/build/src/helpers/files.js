"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonFile = void 0;
var fs_1 = __importDefault(require("fs"));
var readJsonFile = function (filename) {
    var file = fs_1.default.readFileSync("assets/" + filename, 'utf-8');
    return JSON.parse(file);
};
exports.readJsonFile = readJsonFile;
