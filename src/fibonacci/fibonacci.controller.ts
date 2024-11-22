import { Controller, Get, Param } from '@nestjs/common';
// import { FibonacciWorkerHost } from './fibonacci-host';
import Piscina from 'piscina';
import { resolve } from 'path';

@Controller('fibonacci')
export class FibonacciController {
  // constructor(private readonly fibonacciHost: FibonacciWorkerHost) {}
  fibonacciWorker = new Piscina({
    filename: resolve(__dirname, 'fibonacci.worker.js'),
  });

  @Get(':n')
  getFibonacci(@Param('n') n: number = 10) {
    return this.fibonacciWorker.run(n);
  }
}
