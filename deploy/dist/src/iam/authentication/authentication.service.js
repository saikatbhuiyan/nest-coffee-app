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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const hashing_service_1 = require("../hashing/hashing.service");
const keys_constant_1 = require("../../common/constant/keys.constant");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const refresh_token_ids_storage_1 = require("./refresh-token-ids.storage");
const crypto_1 = require("crypto");
const extend_error_1 = require("../../errors/extend.error");
let AuthenticationService = class AuthenticationService {
    constructor(usersRepository, hashingService, jwtService, configService, refreshTokenIdsStorage) {
        this.usersRepository = usersRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.refreshTokenIdsStorage = refreshTokenIdsStorage;
    }
    async signUp(signUpDto) {
        try {
            const { email, password } = signUpDto;
            const existingUser = await this.usersRepository.findOne({
                where: { email },
            });
            if (existingUser) {
                throw new common_1.ConflictException();
            }
            const user = new user_entity_1.User();
            user.email = email;
            user.password = await this.hashingService.hash(password);
            return await this.usersRepository.save(user);
        }
        catch (error) {
            const pgUniqueViolationErrorCode = keys_constant_1.PG_UNIQUE_VIOLATION_ERROR_CODE;
            if (error.code === pgUniqueViolationErrorCode) {
                throw new common_1.ConflictException();
            }
            throw error;
        }
    }
    async signIn(signInDto) {
        const user = await this.usersRepository.findOneBy({
            email: signInDto.email,
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User does not exists');
        }
        const isEqual = await this.hashingService.compare(signInDto.password, user.password);
        if (!isEqual) {
            throw new common_1.UnauthorizedException('Credentials not valid!');
        }
        return await this.generateToken(user);
    }
    async generateToken(user) {
        const refreshTokenId = (0, crypto_1.randomUUID)();
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken(user.id, this.configService.get('jwt.accessTokenTtl'), {
                email: user.email,
            }),
            this.signToken(user.id, this.configService.get('jwt.refreshTokenTtl'), { refreshTokenId }),
        ]);
        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(refreshTokenDto) {
        try {
            const { sub, refreshTokenId } = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
                secret: this.configService.get('jwt.secret'),
                audience: this.configService.get('jwt.tokenAudience'),
                issuer: this.configService.get('jwt.tokenIssuer'),
            });
            const user = await this.usersRepository.findOneByOrFail({ id: sub });
            const isValid = await this.refreshTokenIdsStorage.validate(user.id, refreshTokenId);
            if (!isValid) {
                throw new Error('Refresh token is invalid');
            }
            await this.refreshTokenIdsStorage.invalidate(user.id);
            return this.generateToken(user);
        }
        catch (error) {
            if (error instanceof extend_error_1.InvalidateRefreshTokenError) {
                throw new common_1.UnauthorizedException('Access denied');
            }
            throw new common_1.UnauthorizedException(error);
        }
    }
    async signToken(userId, expiresIn, payload) {
        return await this.jwtService.signAsync({
            sub: userId,
            ...payload,
        }, {
            audience: this.configService.get('jwt.tokenAudience'),
            issuer: this.configService.get('jwt.tokenIssuer'),
            secret: this.configService.get('jwt.secret'),
            expiresIn,
        });
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_service_1.HashingService,
        jwt_1.JwtService,
        config_1.ConfigService,
        refresh_token_ids_storage_1.RefreshTokenIdsStorage])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map