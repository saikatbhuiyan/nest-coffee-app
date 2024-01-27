import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { Coffee } from './entites/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Res() response: Response,
  ) {
    // const { limit, offset } = paginationQuery;

    response.status(200).send(this.coffeesService.findAll(paginationQuery));
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //     return 'This action returns a single coffees with id ' + params.id
  // }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Coffee> {
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeesService.create(createCoffeeDto);
    return createCoffeeDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
