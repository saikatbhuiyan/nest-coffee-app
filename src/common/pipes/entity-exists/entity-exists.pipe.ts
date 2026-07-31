import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export function EntityExistsPipe(entityCls: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipeCls implements PipeTransform {
    constructor(
      @InjectRepository(entityCls)
      private entityRepository: Repository<typeof entityCls>,
    ) {}
    async transform(value: any, metadata: ArgumentMetadata) {
      await this.entityRepository.exists({ where: { id: value } as any });
      return value;
    }
  }
  return EntityExistsPipeCls;
}
