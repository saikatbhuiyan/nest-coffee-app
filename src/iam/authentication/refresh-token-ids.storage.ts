/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';
import { InvalidateRefreshTokenError } from '../../errors/extend.error';

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(RefreshTokenIdsStorage.name);
  private redisClient: Redis;

  onApplicationBootstrap() {
    // TODO: Ideally, we should move this to the dedicated "RedisModule" instead of initiating the connection here.
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      retryStrategy(times) {
        if (times > 5) return null;
        return Math.min(times * 200, 2000);
      },
      maxRetriesPerRequest: null,
      lazyConnect: true,
      enableOfflineQueue: false,
    });

    this.redisClient.on('error', (err) => {
      this.logger.error(`Redis connection error: ${err.message}`);
    });
  }

  onApplicationShutdown(_signal?: string) {
    return this.redisClient.quit();
  }

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.redisClient.set(this.getKey(userId), tokenId);
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storedToken = await this.redisClient.get(this.getKey(userId));
    if (storedToken !== tokenId) {
      throw new InvalidateRefreshTokenError();
    }
    return storedToken === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
