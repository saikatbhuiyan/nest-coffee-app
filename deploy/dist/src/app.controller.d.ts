import { AppService, HealthCheckResult } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    healthCheck(): Promise<HealthCheckResult>;
}
