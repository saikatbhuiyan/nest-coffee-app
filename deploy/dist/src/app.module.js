"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const Joi = __importStar(require("joi"));
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const coffees_module_1 = require("./coffees/coffees.module");
const typeorm_1 = require("@nestjs/typeorm");
const coffee_rating_module_1 = require("./coffee-rating/coffee-rating.module");
const config_1 = require("@nestjs/config");
const common_module_1 = require("./common/common.module");
const users_module_1 = require("./users/users.module");
const iam_module_1 = require("./iam/iam.module");
const scheduler_module_1 = require("./scheduler/scheduler.module");
const cron_module_1 = require("./cron/cron.module");
const fibonacci_module_1 = require("./fibonacci/fibonacci.module");
const app_config_1 = __importDefault(require("./config/app.config"));
const http_client_module_1 = require("./http-client/http-client.module");
const typeorm_2 = require("typeorm");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default],
                validationSchema: Joi.object({
                    DATABASE_HOST: Joi.string().required(),
                    DATABASE_PORT: Joi.number().default(5432),
                    DATABASE_USER: Joi.string().required(),
                    DATABASE_PASSWORD: Joi.string().required(),
                    DATABASE_NAME: Joi.string().required(),
                    NODE_ENV: Joi.string()
                        .valid('development', 'production', 'test')
                        .default('development'),
                    JWT_SECRET: Joi.string().required(),
                    JWT_TOKEN_AUDIENCE: Joi.string().optional(),
                    JWT_TOKEN_ISSUER: Joi.string().optional(),
                    JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
                    JWT_REFRESH_TOKEN_TTL: Joi.number().default(86400),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const dbConfig = configService.get('database');
                    return {
                        type: 'postgres',
                        host: dbConfig.host,
                        port: dbConfig.port,
                        username: dbConfig.username,
                        password: dbConfig.password,
                        database: dbConfig.name,
                        autoLoadEntities: true,
                        synchronize: false,
                        logging: true,
                        retryAttempts: 2,
                        retryDelay: 3000,
                        verboseRetryLog: true,
                    };
                },
                dataSourceFactory: async (options) => {
                    const logger = new common_1.Logger('TypeORM');
                    const dataSource = new typeorm_2.DataSource(options);
                    try {
                        await dataSource.initialize();
                        logger.log('Database connected successfully');
                    }
                    catch (error) {
                        logger.error(`Database connection failed: ${error.message}. App will continue without database.`);
                        dataSource.isInitialized = true;
                    }
                    return dataSource;
                },
            }),
            nestjs_pino_1.LoggerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const { environment } = configService.get('environment');
                    const isProduction = environment === 'production';
                    return {
                        pinoHttp: {
                            transport: isProduction
                                ? undefined
                                : {
                                    target: 'pino-pretty',
                                    options: { singleLine: true },
                                },
                            level: isProduction ? 'info' : 'debug',
                        },
                    };
                },
            }),
            coffees_module_1.CoffeesModule,
            coffee_rating_module_1.CoffeeRatingModule,
            common_module_1.CommonModule,
            users_module_1.UsersModule,
            iam_module_1.IamModule,
            scheduler_module_1.SchedulerModule,
            cron_module_1.CronModule,
            fibonacci_module_1.FibonacciModule,
            http_client_module_1.HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),
            http_client_module_1.HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),
            http_client_module_1.HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map