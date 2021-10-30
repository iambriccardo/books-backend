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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEdgeNGrams = exports.healthCheck = exports.computeUptime = exports.shuffle = exports.delay = void 0;
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.delay = delay;
var shuffle = function (array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
};
exports.shuffle = shuffle;
var computeUptime = function () {
    var utSeconds = process.uptime();
    var utMinutes = utSeconds / 60;
    var utHours = utMinutes / 60;
    utSeconds = Math.floor(utSeconds);
    utMinutes = Math.floor(utMinutes);
    utHours = Math.floor(utHours);
    utHours = utHours % 60;
    utMinutes = utMinutes % 60;
    utSeconds = utSeconds % 60;
    return {
        hours: utHours,
        minutes: utMinutes,
        seconds: utSeconds,
    };
};
exports.computeUptime = computeUptime;
var healthCheck = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uptime, healthCheck;
    return __generator(this, function (_a) {
        uptime = exports.computeUptime();
        healthCheck = {
            uptime: uptime.hours + " Hour(s) " + uptime.minutes + " minute(s) " + uptime.seconds + " second(s)",
            message: 'OK',
            timestamp: Date.now(),
        };
        try {
            res.send(healthCheck);
        }
        catch (e) {
            healthCheck.message = e;
            res.status(503).send(healthCheck);
        }
        return [2 /*return*/];
    });
}); };
exports.healthCheck = healthCheck;
var createEdgeNGrams = function (text) {
    if (text && text.length > 2) {
        var minGram_1 = 2;
        var maxGram_1 = text.length;
        return text
            .split(' ')
            .slice(0, 100)
            .reduce(function (ngrams, token) {
            if (token.length > minGram_1) {
                for (var i = minGram_1; i <= maxGram_1 && i <= token.length; ++i) {
                    var gram = token.substr(0, i);
                    ngrams = __spreadArray(__spreadArray([], ngrams), [gram]);
                }
            }
            else {
                ngrams = __spreadArray(__spreadArray([], ngrams), [token]);
            }
            return ngrams;
        }, []);
    }
    return [text];
};
exports.createEdgeNGrams = createEdgeNGrams;
