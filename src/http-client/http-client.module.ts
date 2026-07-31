import { DynamicModule, Inject, Logger, Module } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  HTTP_MODULE_OPTIONS,
  OPTIONS_TYPE,
} from './http-client.module-definition';

@Module({})
export class HttpClientModule extends ConfigurableModuleClass {
  private readonly logger = new Logger(HttpClientModule.name);

  constructor(@Inject(HTTP_MODULE_OPTIONS) private options) {
    super();
    this.logger.debug(`HttpClient options: ${JSON.stringify(options)}`);
  }

  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.register(options),
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.register(options),
    };
  }
}
