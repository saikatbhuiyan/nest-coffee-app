import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface HealthCheckResult {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  info: Record<string, { status: string }>;
  details: Record<string, { status: string; message?: string }>;
}

@Injectable()
export class AppService {
  private readonly startTime: number;

  constructor(private readonly dataSource: DataSource) {
    this.startTime = Date.now();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async healthCheck(): Promise<HealthCheckResult> {
    const dbStatus = await this.checkDatabase();
    const allHealthy = dbStatus.status === 'ok';

    return {
      status: allHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      environment: process.env.NODE_ENV || 'development',
      info: {
        database: { status: dbStatus.status },
      },
      details: {
        database: {
          status: dbStatus.status,
          message: dbStatus.message,
        },
      },
    };
  }

  private async checkDatabase(): Promise<{
    status: string;
    message?: string;
  }> {
    try {
      await this.dataSource.query('SELECT 1');
      return { status: 'ok' };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
