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

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery, @Res() response: Response) {
    // const { limit, offset } = paginationQuery;

    response.status(200).send(this.coffeesService.findAll());
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //     return 'This action returns a single coffees with id ' + params.id
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Coffee {
    const coffee = this.coffeesService.findOne(id);
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
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
