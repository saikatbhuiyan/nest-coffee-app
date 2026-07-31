"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FibonacciWorkerHost = void 0;
const crypto_1 = require("crypto");
const path_1 = require("path");
const worker_threads_1 = require("worker_threads");
const rxjs_1 = require("rxjs");
class FibonacciWorkerHost {
    onApplicationBootstrap() {
        this.worker = new worker_threads_1.Worker((0, path_1.join)(__dirname, 'fibonacci.worker.js'));
        this.messages = (0, rxjs_1.fromEvent)(this.worker, 'message');
    }
    onApplicationShutdown() {
        this.worker.terminate();
    }
    run(n) {
        const uniqueId = (0, crypto_1.randomUUID)();
        this.worker.postMessage({ n, uniqueId });
        return (0, rxjs_1.firstValueFrom)(this.messages.pipe((0, rxjs_1.filter)(({ id }) => id === uniqueId), (0, rxjs_1.map)(({ result }) => result)));
    }
}
exports.FibonacciWorkerHost = FibonacciWorkerHost;
//# sourceMappingURL=fibonacci-host.js.map