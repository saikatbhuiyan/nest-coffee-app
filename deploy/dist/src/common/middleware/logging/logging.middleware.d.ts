import { NestMiddleware } from '@nestjs/common';
export declare class LoggingMiddleware implements NestMiddleware {
    private readonly logger;
    use(req: any, res: any, next: () => void): void;
}
