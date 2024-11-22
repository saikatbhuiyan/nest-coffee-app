import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { Worker } from 'worker_threads';
import { filter, firstValueFrom, fromEvent, map, Observable } from 'rxjs';

export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker;
  private messages: Observable<{ id: string; result: number }>;

  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    this.messages = fromEvent(this.worker, 'message') as unknown as Observable<{
      id: string;
      result: number;
    }>;
  }
  onApplicationShutdown() {
    this.worker.terminate();
  }

  run(n: number) {
    const uniqueId = randomUUID();
    this.worker.postMessage({ n, uniqueId });
    return firstValueFrom(
      // convert our observable to a Promise
      this.messages.pipe(
        filter(({ id }) => id === uniqueId), // filter out messages by IDs
        map(({ result }) => result), // pluck results value
      ),
    );
  }
}
