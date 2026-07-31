import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
export declare class RefreshTokenIdsStorage implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly logger;
    private redisClient;
    onApplicationBootstrap(): void;
    onApplicationShutdown(_signal?: string): Promise<"OK">;
    insert(userId: number, tokenId: string): Promise<void>;
    validate(userId: number, tokenId: string): Promise<boolean>;
    invalidate(userId: number): Promise<void>;
    private getKey;
}
