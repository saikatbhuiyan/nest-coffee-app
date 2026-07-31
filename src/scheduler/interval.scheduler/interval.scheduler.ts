import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { INTERVAL_HOST_KEY } from '../decorators/interval-host.decorator';
import { INTERVAL_KEY } from '../decorators/interval.decorator';

@Injectable()
export class IntervalScheduler
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(IntervalScheduler.name);
  private intervals: NodeJS.Timer[] = [];

  constructor(
    private readonly reflector: Reflector,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    const providers = this.discoveryService.getProviders();
    providers.forEach((wrapper) => {
      const { instance } = wrapper;
      const prototype = instance && Object.getPrototypeOf(instance);
      if (!instance && !prototype) {
        return;
      }
      const isIntervalHost =
        this.reflector.get(INTERVAL_HOST_KEY, instance.constructor) ?? false;
      if (!isIntervalHost) {
        return;
      }
      this.logger.debug(`Interval host: ${String(wrapper.token)}`);
      const methodKeys = this.metadataScanner.getAllMethodNames(prototype);
      methodKeys.forEach((methodKey) => {
        const interval = this.reflector.get(INTERVAL_KEY, instance[methodKey]);
        if (interval === undefined) {
          return;
        }
        const intervalRef = setInterval(() => {
          instance[methodKey]();
        }, interval);
        this.intervals.push(intervalRef);
      });
    });
  }

  onApplicationShutdown(signal?: string) {
    this.intervals.forEach((intervalRef) =>
      clearInterval(intervalRef as unknown as number),
    );
  }
}
