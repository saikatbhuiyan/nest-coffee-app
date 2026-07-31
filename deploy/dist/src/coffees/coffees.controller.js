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
var CoffeesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesController = void 0;
const openapi = require("@nestjs/swagger");
const circuit_breaker_interceptor_1 = require("./../common/interceptors/circuit-breaker/circuit-breaker.interceptor");
const public_decorator_1 = require("./../common/decorators/public.decorator");
const coffees_service_1 = require("./coffees.service");
const common_1 = require("@nestjs/common");
const coffee_entity_1 = require("./entites/coffee.entity");
const create_coffee_dto_1 = require("./dto/create-coffee.dto");
const update_coffee_dto_1 = require("./dto/update-coffee.dto");
const swagger_1 = require("@nestjs/swagger");
const active_user_decorator_1 = require("../iam/decorators/active-user.decorator");
const roles_decorator_1 = require("../iam/authorization/decorators/roles.decorator");
const role_enum_1 = require("../users/enums/role.enum");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const entity_exists_pipe_1 = require("../common/pipes/entity-exists/entity-exists.pipe");
let CoffeesController = CoffeesController_1 = class CoffeesController {
    constructor(coffeesService) {
        this.coffeesService = coffeesService;
        this.logger = new common_1.Logger(CoffeesController_1.name);
    }
    async findAll(paginationQuery, response) {
        this.logger.debug('findAll called');
        throw new common_1.RequestTimeoutException('Test circuit breaker');
        response
            .status(200)
            .send(await this.coffeesService.findAll(paginationQuery));
    }
    async findOne(id, user) {
        this.logger.debug(`findOne user: ${JSON.stringify(user)}`);
        const coffee = await this.coffeesService.findOne(id);
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee not found with id ${id}`);
        }
        return coffee;
    }
    create(createCoffeeDto) {
        this.coffeesService.create(createCoffeeDto);
        return createCoffeeDto;
    }
    update(id, updateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }
    delete(id) {
        return this.coffeesService.remove(id);
    }
};
exports.CoffeesController = CoffeesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto, Object]),
    __metadata("design:returntype", Promise)
], CoffeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entites/coffee.entity").Coffee }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoffeesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("./dto/create-coffee.dto").CreateCoffeeDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coffee_dto_1.CreateCoffeeDto]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entites/coffee.entity").Coffee }),
    __param(0, (0, common_1.Param)('id', (0, entity_exists_pipe_1.EntityExistsPipe)(coffee_entity_1.Coffee))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coffee_dto_1.UpdateCoffeeDto]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entites/coffee.entity").Coffee }),
    __param(0, (0, common_1.Param)('id', (0, entity_exists_pipe_1.EntityExistsPipe)(coffee_entity_1.Coffee))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "delete", null);
exports.CoffeesController = CoffeesController = CoffeesController_1 = __decorate([
    (0, common_1.UseInterceptors)(circuit_breaker_interceptor_1.CircuitBreakerInterceptor),
    (0, swagger_1.ApiTags)('coffees'),
    (0, common_1.Controller)('coffees'),
    __metadata("design:paramtypes", [coffees_service_1.CoffeesService])
], CoffeesController);
//# sourceMappingURL=coffees.controller.js.map