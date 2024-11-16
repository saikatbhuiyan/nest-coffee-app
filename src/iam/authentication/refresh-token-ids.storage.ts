/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';
import { InvalidateRefreshTokenError } from '../../errors/extend.error';

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;

  onApplicationBootstrap() {
    // TODO: Ideally, we should move this to the dedicated "RedisModule" instead of initiating the connection here.
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
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
