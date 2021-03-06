"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var pino_1 = __importDefault(require("pino"));
var environment_1 = require("./environment");
/**
 TRACE – the most fine-grained information only used in rare cases where you need
 the full visibility of what is happening in your application and inside the
 third-party libraries that you use. You can expect the TRACE logging level to
 be very verbose. You can use it for example to annotate each step in the
 algorithm or each individual query with parameters in your code.

 DEBUG – less granular compared to the TRACE level, but it is more than you
 will need in everyday use. The DEBUG log level should be used for information
 that may be needed for diagnosing issues and troubleshooting or when running
 application in the test environment for the purpose of making sure everything
 is running correctly

 INFO – the standard log level indicating that something happened,
 application entered a certain state, etc. For example, a controller of your
 authorization API may include an INFO log level with information on which
 user requested authorization if the authorization was successful or not.
 The information logged using the INFO log level should be purely informative
 and not looking into them on a regular basis shouldn’t result in missing
 any important information.

 WARN – the log level that indicates that something unexpected happened
 in the application, a problem, or a situation that might disturb one of
 the processes. But that doesn’t mean that the application failed.
 The WARN level should be used in situations that are unexpected, but
 the code can continue the work. For example, a parsing error occurred
 that resulted in a certain document not being processed.

 ERROR – the log level that should be used when the application hits an
 issue preventing one or more functionalities from properly functioning.
 The ERROR log level can be used when one of the payment systems
 is not available, but there is still the option to check out the basket
 in the e-commerce application or when your social media logging option is not
 working for some reason.

 FATAL – the log level that tells that the application encountered an event
 or entered a state in which one of the crucial business functionality is no
 longer working. A FATAL log level may be used when the application is not
 able to connect to a crucial data store like a database or all the payment
 systems are not available and users can’t checkout their
 baskets in your e-commerce.
 */
exports.logger = pino_1.default({
    enabled: environment_1.ENABLE_LOGGING,
    prettyPrint: { colorize: true },
});
