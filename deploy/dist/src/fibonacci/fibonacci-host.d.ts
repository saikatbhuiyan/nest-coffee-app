import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
export declare class FibonacciWorkerHost implements OnApplicationBootstrap, OnApplicationShutdown {
    private worker;
    private messages;
    onApplicationBootstrap(): void;
    onApplicationShutdown(): void;
    run(n: number): Promise<number>;
}
