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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CoffeesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = exports.COFFEES_DATA_SOURCE = void 0;
const common_1 = require("@nestjs/common");
const coffee_entity_1 = require("./entites/coffee.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flavor_entity_1 = require("./entites/flavor.entity");
const event_entity_1 = require("../events/entities/event.entity");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
exports.COFFEES_DATA_SOURCE = Symbol('COFFEES_DATA_SOURCE');
let CoffeesService = CoffeesService_1 = class CoffeesService {
    constructor(coffeeRepository, flavorRepository, eventRepository, dataSource, configService, coffeeDataSource, lazyModuleLoader) {
        this.coffeeRepository = coffeeRepository;
        this.flavorRepository = flavorRepository;
        this.eventRepository = eventRepository;
        this.dataSource = dataSource;
        this.configService = configService;
        this.coffeeDataSource = coffeeDataSource;
        this.lazyModuleLoader = lazyModuleLoader;
        this.logger = new common_1.Logger(CoffeesService_1.name);
    }
    async findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return await this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }
    async findOne(id) {
        const loadStart = Date.now();
        const rewardsModuleRef = await this.lazyModuleLoader.load(() => Promise.resolve().then(() => __importStar(require('../rewards/rewards.module'))).then((m) => m.RewardsModule));
        const { RewardsService } = await Promise.resolve().then(() => __importStar(require('../rewards/rewards.service')));
        const rewardsService = rewardsModuleRef.get(RewardsService);
        this.logger.debug(`RewardsModule lazy loaded in ${Date.now() - loadStart}ms`);
        rewardsService.giveReward();
        const coffee = await this.coffeeRepository.findOne({
            where: { id: +id },
            relations: ['flavors'],
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee not found with id ${id}`);
        }
        return coffee;
    }
    async create(createCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)));
        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors,
        });
        return this.coffeeRepository.save(coffee);
    }
    async update(id, updateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors &&
            (await Promise.all(updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))));
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors,
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee not found with id ${id}`);
        }
        return this.coffeeRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }
    async recommendCoffee(coffee) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;
            const recommendEvent = new event_entity_1.Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async preloadFlavorByName(name) {
        const existingFlavor = await this.flavorRepository.findOne({
            where: { name: name },
        });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
};
exports.CoffeesService = CoffeesService;
exports.CoffeesService = CoffeesService = CoffeesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coffee_entity_1.Coffee)),
    __param(1, (0, typeorm_1.InjectRepository)(flavor_entity_1.Flavor)),
    __param(2, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(5, (0, common_1.Inject)(exports.COFFEES_DATA_SOURCE)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        config_1.ConfigService, Object, core_1.LazyModuleLoader])
], CoffeesService);
//# sourceMappingURL=coffees.service.js.map