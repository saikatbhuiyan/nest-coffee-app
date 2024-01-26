import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll(): string {
      return 'This action returns all coffees';
    }

    // @Get(':id')
    // findOne(@Param() params): string {
    //     return 'This action returns a single coffees with id ' + params.id
    // }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return 'This action returns a single coffees with id ' + id
    }
}
