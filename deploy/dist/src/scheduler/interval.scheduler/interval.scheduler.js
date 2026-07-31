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
var IntervalScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalScheduler = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const interval_host_decorator_1 = require("../decorators/interval-host.decorator");
const interval_decorator_1 = require("../decorators/interval.decorator");
let IntervalScheduler = IntervalScheduler_1 = class IntervalScheduler {
    constructor(reflector, discoveryService, metadataScanner) {
        this.reflector = reflector;
        this.discoveryService = discoveryService;
        this.metadataScanner = metadataScanner;
        this.logger = new common_1.Logger(IntervalScheduler_1.name);
        this.intervals = [];
    }
    onApplicationBootstrap() {
        const providers = this.discoveryService.getProviders();
        providers.forEach((wrapper) => {
            const { instance } = wrapper;
            const prototype = instance && Object.getPrototypeOf(instance);
            if (!instance && !prototype) {
                return;
            }
            const isIntervalHost = this.reflector.get(interval_host_decorator_1.INTERVAL_HOST_KEY, instance.constructor) ?? false;
            if (!isIntervalHost) {
                return;
            }
            this.logger.debug(`Interval host: ${String(wrapper.token)}`);
            const methodKeys = this.metadataScanner.getAllMethodNames(prototype);
            methodKeys.forEach((methodKey) => {
                const interval = this.reflector.get(interval_decorator_1.INTERVAL_KEY, instance[methodKey]);
                if (interval === undefined) {
                    return;
                }
                const intervalRef = setInterval(() => {
                    instance[methodKey]();
                }, interval);
                this.intervals.push(intervalRef);
            });
        });
    }
    onApplicationShutdown(signal) {
        this.intervals.forEach((intervalRef) => clearInterval(intervalRef));
    }
};
exports.IntervalScheduler = IntervalScheduler;
exports.IntervalScheduler = IntervalScheduler = IntervalScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        core_1.DiscoveryService,
        core_1.MetadataScanner])
], IntervalScheduler);
//# sourceMappingURL=interval.scheduler.js.map