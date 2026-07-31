import { DataSource } from 'typeorm';
export interface HealthCheckResult {
    status: 'ok' | 'error';
    timestamp: string;
    uptime: number;
    environment: string;
    info: Record<string, {
        status: string;
    }>;
    details: Record<string, {
        status: string;
        message?: string;
    }>;
}
export declare class AppService {
    private readonly dataSource;
    private readonly startTime;
    constructor(dataSource: DataSource);
    getHello(): string;
    healthCheck(): Promise<HealthCheckResult>;
    private checkDatabase;
}
