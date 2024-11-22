import { CircuitBreakerInterceptor } from './../common/interceptors/circuit-breaker/circuit-breaker.interceptor';
// import { ActiveUserData } from './../iam/interface/active-user-data-interface';
import { Public } from './../common/decorators/public.decorator';
import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  // HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  RequestTimeoutException,
  Res,
  UseInterceptors,
  // SetMetadata,
} from '@nestjs/common';

import { Response } from 'express';
import { Coffee } from './entites/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { ActiveUserData } from '../iam/interface/active-user-data-interface';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@UseInterceptors(CircuitBreakerInterceptor)
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @SetMetadata('isPublic', true)
  @Public()
  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Res() response: Response,
  ) {
    console.log('findAll expects without paginationQuery');
    throw new RequestTimeoutException('Test circuit breaker');
    response
      .status(200)
      .send(await this.coffeesService.findAll(paginationQuery));
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<Coffee> {
  //   console.log('params', id);

  //   return this.coffeesService.findOne(id);
  // }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserData,
  ): Promise<Coffee> {
    console.log(user);
    const coffee = await this.coffeesService.findOne(id);
    if (!coffee) {
      // throw new HttpException(
      //   `Coffee not found with id ${id}`,
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException(`Coffee not found with id ${id}`);
    }
    return coffee;
  }

  @Roles(Role.Admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeesService.create(createCoffeeDto);
    return createCoffeeDto;
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
