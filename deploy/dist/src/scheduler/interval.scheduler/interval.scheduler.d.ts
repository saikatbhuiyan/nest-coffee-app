import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
export declare class IntervalScheduler implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly reflector;
    private readonly discoveryService;
    private readonly metadataScanner;
    private readonly logger;
    private intervals;
    constructor(reflector: Reflector, discoveryService: DiscoveryService, metadataScanner: MetadataScanner);
    onApplicationBootstrap(): void;
    onApplicationShutdown(signal?: string): void;
}
