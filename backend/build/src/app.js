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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var express_1 = __importDefault(require("express"));
var v1_1 = __importDefault(require("./routes/v1"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = require("./helpers/mongoose");
var passport_1 = __importDefault(require("passport"));
var authentication_1 = require("./helpers/authentication");
var environment_1 = require("./helpers/environment");
var logging_1 = require("./helpers/logging");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var files_1 = require("./helpers/files");
var utils_1 = require("./helpers/utils");
var rate_limiting_1 = require("./helpers/rate-limiting");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
    }
    Server.prototype.configurePassport = function () {
        passport_1.default.use('login', authentication_1.AuthLocalStrategy);
        passport_1.default.use(authentication_1.AuthJwtStrategy);
    };
    Server.prototype.applyMiddlewares = function () {
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use(passport_1.default.initialize());
        this.app.use(rate_limiting_1.defaultRateLimiter);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(files_1.readJsonFile('openapi.json')));
        this.app.use('/v1', v1_1.default);
        this.app.get('/', utils_1.healthCheck);
    };
    Server.prototype.configure = function () {
        logging_1.logger.info('Configuring web service.');
        this.configurePassport();
        this.applyMiddlewares();
        logging_1.logger.info('Configuration finished.');
        this.app.listen(environment_1.PORT, function () {
            logging_1.logger.info("Listening on port " + environment_1.PORT + " \uD83D\uDE80.");
        });
    };
    Server.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logging_1.logger.info('Starting web service.');
                        return [4 /*yield*/, mongoose_1.connectToMongo(environment_1.MONGO_DB_URL)];
                    case 1:
                        _a.sent();
                        this.configure();
                        logging_1.logger.info('Web service started.');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        logging_1.logger.fatal("An error occurred and the web service cannot be started: " + error_1);
                        process.exit(1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Server;
}());
exports.server = new Server();
