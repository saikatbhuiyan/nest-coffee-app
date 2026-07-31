"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LoggingMiddleware = LoggingMiddleware_1 = class LoggingMiddleware {
    constructor() {
        this.logger = new common_1.Logger(LoggingMiddleware_1.name);
    }
    use(req, res, next) {
        this.logger.log(`Request: ${req.method} ${req.url}`);
        const startTime = Date.now();
        res.on('finish', () => this.logger.log(`Response: ${req.method} ${req.url} ${Date.now() - startTime}ms`));
        next();
    }
};
exports.LoggingMiddleware = LoggingMiddleware;
exports.LoggingMiddleware = LoggingMiddleware = LoggingMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingMiddleware);
//# sourceMappingURL=logging.middleware.js.map