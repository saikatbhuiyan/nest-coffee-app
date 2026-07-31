"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const app_config_1 = __importDefault(require("./app.config"));
config_1.ConfigModule.forRoot({ load: [app_config_1.default] });
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
});
//# sourceMappingURL=data-source.js.map