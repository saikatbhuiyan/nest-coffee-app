import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class CircuitBreakerInterceptor implements NestInterceptor {
    private readonly circuitBreakerByHandler;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
