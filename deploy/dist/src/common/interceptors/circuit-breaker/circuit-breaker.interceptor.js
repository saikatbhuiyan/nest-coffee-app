"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreakerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const circuit_breaker_1 = require("../circuit-breaker");
let CircuitBreakerInterceptor = class CircuitBreakerInterceptor {
    constructor() {
        this.circuitBreakerByHandler = new WeakMap();
    }
    intercept(context, next) {
        const methodRef = context.getHandler();
        let circuitBreaker;
        if (this.circuitBreakerByHandler.has(methodRef)) {
            circuitBreaker = this.circuitBreakerByHandler.get(methodRef);
        }
        else {
            circuitBreaker = new circuit_breaker_1.CircuitBreaker();
            this.circuitBreakerByHandler.set(methodRef, circuitBreaker);
        }
        return circuitBreaker.exec(next);
    }
};
exports.CircuitBreakerInterceptor = CircuitBreakerInterceptor;
exports.CircuitBreakerInterceptor = CircuitBreakerInterceptor = __decorate([
    (0, common_1.Injectable)()
], CircuitBreakerInterceptor);
//# sourceMappingURL=circuit-breaker.interceptor.js.map