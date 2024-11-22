import { Module } from '@nestjs/common';
import { FibonacciController } from './fibonacci.controller';
import { FibonacciWorkerHost } from './fibonacci-host';

@Module({
  providers: [FibonacciWorkerHost],
  controllers: [FibonacciController],
})
export class FibonacciModule {}
