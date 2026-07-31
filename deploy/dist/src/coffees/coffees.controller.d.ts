import { CoffeesService } from './coffees.service';
import { Response } from 'express';
import { Coffee } from './entites/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ActiveUserData } from '../iam/interface/active-user-data-interface';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class CoffeesController {
    private readonly coffeesService;
    private readonly logger;
    constructor(coffeesService: CoffeesService);
    findAll(paginationQuery: PaginationQueryDto, response: Response): Promise<void>;
    findOne(id: string, user: ActiveUserData): Promise<Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): CreateCoffeeDto;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    delete(id: string): Promise<Coffee>;
}
