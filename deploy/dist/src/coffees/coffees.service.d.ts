import { Coffee } from './entites/coffee.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entites/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { ConfigService } from '@nestjs/config';
import { LazyModuleLoader } from '@nestjs/core';
export declare const COFFEES_DATA_SOURCE: unique symbol;
export interface CoffeeDataSource {
    [index: number]: Coffee;
}
export declare class CoffeesService {
    private readonly coffeeRepository;
    private readonly flavorRepository;
    private readonly eventRepository;
    private readonly dataSource;
    private readonly configService;
    private readonly coffeeDataSource;
    private readonly lazyModuleLoader;
    private readonly logger;
    constructor(coffeeRepository: Repository<Coffee>, flavorRepository: Repository<Flavor>, eventRepository: Repository<Event>, dataSource: DataSource, configService: ConfigService, coffeeDataSource: CoffeeDataSource, lazyModuleLoader: LazyModuleLoader);
    findAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]>;
    findOne(id: string): Promise<Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: string): Promise<Coffee>;
    recommendCoffee(coffee: Coffee): Promise<void>;
    private preloadFlavorByName;
}
