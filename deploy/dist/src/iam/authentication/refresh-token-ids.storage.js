"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RefreshTokenIdsStorage_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenIdsStorage = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const extend_error_1 = require("../../errors/extend.error");
let RefreshTokenIdsStorage = RefreshTokenIdsStorage_1 = class RefreshTokenIdsStorage {
    constructor() {
        this.logger = new common_1.Logger(RefreshTokenIdsStorage_1.name);
    }
    onApplicationBootstrap() {
        this.redisClient = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
            retryStrategy(times) {
                if (times > 5)
                    return null;
                return Math.min(times * 200, 2000);
            },
            maxRetriesPerRequest: null,
            lazyConnect: true,
            enableOfflineQueue: false,
        });
        this.redisClient.on('error', (err) => {
            this.logger.error(`Redis connection error: ${err.message}`);
        });
    }
    onApplicationShutdown(_signal) {
        return this.redisClient.quit();
    }
    async insert(userId, tokenId) {
        await this.redisClient.set(this.getKey(userId), tokenId);
    }
    async validate(userId, tokenId) {
        const storedToken = await this.redisClient.get(this.getKey(userId));
        if (storedToken !== tokenId) {
            throw new extend_error_1.InvalidateRefreshTokenError();
        }
        return storedToken === tokenId;
    }
    async invalidate(userId) {
        await this.redisClient.del(this.getKey(userId));
    }
    getKey(userId) {
        return `user-${userId}`;
    }
};
exports.RefreshTokenIdsStorage = RefreshTokenIdsStorage;
exports.RefreshTokenIdsStorage = RefreshTokenIdsStorage = RefreshTokenIdsStorage_1 = __decorate([
    (0, common_1.Injectable)()
], RefreshTokenIdsStorage);
//# sourceMappingURL=refresh-token-ids.storage.js.map