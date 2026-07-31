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
exports.AuthenticationController = void 0;
const openapi = require("@nestjs/swagger");
const authentication_service_1 = require("./authentication.service");
const common_1 = require("@nestjs/common");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const auth_decorator_1 = require("./decorators/auth.decorator");
const auth_type_enum_1 = require("./enums/auth-type.enum");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let AuthenticationController = class AuthenticationController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
    async signIn(signInDto) {
        return await this.authService.signIn(signInDto);
    }
    async refreshTokens(refreshTokenDto) {
        return await this.authService.refreshTokens(refreshTokenDto);
    }
    async signIn2(response, signInDto) {
        const accessToken = await this.authService.signIn(signInDto);
        response.cookie('accessToken', accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: true,
        });
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('sign-up'),
    openapi.ApiResponse({ status: 201, type: require("../../users/entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "signUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('sign-in'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signIn", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('refresh-token'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "refreshTokens", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('sign-in-2'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signIn2", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.None),
    (0, common_1.Controller)('authentication'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], AuthenticationController);
//# sourceMappingURL=authentication.controller.js.map