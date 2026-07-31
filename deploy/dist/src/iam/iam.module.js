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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamModule = void 0;
const common_1 = require("@nestjs/common");
const hashing_service_1 = require("./hashing/hashing.service");
const bcrypt_service_1 = require("./hashing/bcrypt.service");
const authentication_controller_1 = require("./authentication/authentication.controller");
const authentication_service_1 = require("./authentication/authentication.service");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const app_config_1 = __importDefault(require("../config/app.config"));
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const access_token_guard_1 = require("./authentication/guards/access-token/access-token.guard");
const authentication_guard_1 = require("./authentication/guards/authentication/authentication.guard");
const refresh_token_ids_storage_1 = require("./authentication/refresh-token-ids.storage");
const roles_guard_1 = require("./authorization/guards/roles/roles.guard");
let IamModule = class IamModule {
};
exports.IamModule = IamModule;
exports.IamModule = IamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            config_1.ConfigModule.forFeature(app_config_1.default),
        ],
        providers: [
            {
                provide: hashing_service_1.HashingService,
                useClass: bcrypt_service_1.BcryptService,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: authentication_guard_1.AuthenticationGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            access_token_guard_1.AccessTokenGuard,
            refresh_token_ids_storage_1.RefreshTokenIdsStorage,
            authentication_service_1.AuthenticationService,
            jwt_1.JwtService,
        ],
        controllers: [authentication_controller_1.AuthenticationController],
    })
], IamModule);
//# sourceMappingURL=iam.module.js.map