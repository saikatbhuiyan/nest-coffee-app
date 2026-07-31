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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AppService = class AppService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.startTime = Date.now();
    }
    getHello() {
        return 'Hello World!';
    }
    async healthCheck() {
        const dbStatus = await this.checkDatabase();
        const allHealthy = dbStatus.status === 'ok';
        return {
            status: allHealthy ? 'ok' : 'error',
            timestamp: new Date().toISOString(),
            uptime: Math.floor((Date.now() - this.startTime) / 1000),
            environment: process.env.NODE_ENV || 'development',
            info: {
                database: { status: dbStatus.status },
            },
            details: {
                database: {
                    status: dbStatus.status,
                    message: dbStatus.message,
                },
            },
        };
    }
    async checkDatabase() {
        try {
            await this.dataSource.query('SELECT 1');
            return { status: 'ok' };
        }
        catch (error) {
            return {
                status: 'error',
                message: error.message,
            };
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppService);
//# sourceMappingURL=app.service.js.map