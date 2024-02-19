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
  Res,
  // SetMetadata,
} from '@nestjs/common';

import { Response } from 'express';
import { Coffee } from './entites/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @SetMetadata('isPublic', true)
  @Public()
  @Get()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Res() response: Response,
  ) {
    response.status(200).send(this.coffeesService.findAll(paginationQuery));
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //     return 'This action returns a single coffees with id ' + params.id
  // }

  @Get(':id')
  async findOne(@Param('id') id: string, @ActiveUser() user): Promise<Coffee> {
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
