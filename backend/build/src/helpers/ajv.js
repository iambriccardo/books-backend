"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajv = void 0;
var jtd_1 = __importDefault(require("ajv/dist/jtd"));
exports.ajv = new jtd_1.default();
