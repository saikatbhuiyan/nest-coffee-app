"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const interval_host_decorator_1 = require("./../scheduler/decorators/interval-host.decorator");
let CronService = CronService_1 = class CronService {
    constructor() {
        this.logger = new common_1.Logger(CronService_1.name);
    }
    everySecond() {
        this.logger.debug('Every second this method is called');
    }
};
exports.CronService = CronService;
exports.CronService = CronService = CronService_1 = __decorate([
    interval_host_decorator_1.IntervalHost
], CronService);
//# sourceMappingURL=cron.service.js.map