"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FibonacciController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const piscina_1 = __importDefault(require("piscina"));
const path_1 = require("path");
let FibonacciController = class FibonacciController {
    constructor() {
        this.fibonacciWorker = new piscina_1.default({
            filename: (0, path_1.resolve)(__dirname, 'fibonacci.worker.js'),
        });
    }
    getFibonacci(n = 10) {
        return this.fibonacciWorker.run(n);
    }
};
exports.FibonacciController = FibonacciController;
__decorate([
    (0, common_1.Get)(':n'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('n')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FibonacciController.prototype, "getFibonacci", null);
exports.FibonacciController = FibonacciController = __decorate([
    (0, common_1.Controller)('fibonacci')
], FibonacciController);
//# sourceMappingURL=fibonacci.controller.js.map