import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationQuery, @Res() response: Response) {
    const { limit, offset } = paginationQuery;

    response.status(200).send('This action returns all coffees');
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //     return 'This action returns a single coffees with id ' + params.id
  // }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return 'This action returns a single coffees with id ' + id;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body) {
    return body;
    // return 'This action creates a new coffees';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return body;
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Body() body) {
    return body;
  }
}
