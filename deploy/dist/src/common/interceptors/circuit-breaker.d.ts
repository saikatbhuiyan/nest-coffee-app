import { CallHandler } from '@nestjs/common';
export declare class CircuitBreaker {
    private state;
    private failureCount;
    private successCount;
    private lastError;
    private nextAttempt;
    exec(next: CallHandler): import("rxjs").Observable<any>;
    handleFailure(err: Error): void;
    handleSuccess(): void;
}
