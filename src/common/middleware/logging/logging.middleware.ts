import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: any, res: any, next: () => void) {
    this.logger.log(`Request: ${req.method} ${req.url}`);
    const startTime = Date.now();
    res.on('finish', () =>
      this.logger.log(`Response: ${req.method} ${req.url} ${Date.now() - startTime}ms`),
    );
    next();
  }
}
