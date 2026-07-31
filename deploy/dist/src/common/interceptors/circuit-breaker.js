"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
const rxjs_1 = require("rxjs");
const SUCCESS_THRESHOLD = 3;
const FAILURE_THRESHOLD = 3;
const OPEN_TO_HALF_OPEN_WAIT_TIME = 60000;
var CircuitBreakerState;
(function (CircuitBreakerState) {
    CircuitBreakerState[CircuitBreakerState["CLOSED"] = 0] = "CLOSED";
    CircuitBreakerState[CircuitBreakerState["OPEN"] = 1] = "OPEN";
    CircuitBreakerState[CircuitBreakerState["HALF_OPEN"] = 2] = "HALF_OPEN";
})(CircuitBreakerState || (CircuitBreakerState = {}));
class CircuitBreaker {
    constructor() {
        this.state = CircuitBreakerState.CLOSED;
        this.failureCount = 0;
        this.successCount = 0;
    }
    exec(next) {
        if (this.state === CircuitBreakerState.OPEN) {
            if (this.nextAttempt > Date.now()) {
                return (0, rxjs_1.throwError)(() => this.lastError);
            }
            this.state = CircuitBreakerState.HALF_OPEN;
        }
        return next.handle().pipe((0, rxjs_1.tap)({
            next: () => this.handleSuccess(),
            error: (err) => this.handleFailure(err),
        }));
    }
    handleFailure(err) {
        this.failureCount++;
        if (this.failureCount >= FAILURE_THRESHOLD ||
            this.state === CircuitBreakerState.HALF_OPEN) {
            this.state = CircuitBreakerState.OPEN;
            this.lastError = err;
            this.nextAttempt = Date.now() + OPEN_TO_HALF_OPEN_WAIT_TIME;
        }
    }
    handleSuccess() {
        this.failureCount = 0;
        if (this.state === CircuitBreakerState.HALF_OPEN) {
            this.successCount++;
            if (this.successCount >= SUCCESS_THRESHOLD) {
                this.state = CircuitBreakerState.CLOSED;
                this.successCount = 0;
            }
        }
    }
}
exports.CircuitBreaker = CircuitBreaker;
//# sourceMappingURL=circuit-breaker.js.map