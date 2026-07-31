import { DynamicModule } from '@nestjs/common';
import { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, OPTIONS_TYPE } from './http-client.module-definition';
export declare class HttpClientModule extends ConfigurableModuleClass {
    private options;
    private readonly logger;
    constructor(options: any);
    static register(options: typeof OPTIONS_TYPE): DynamicModule;
    static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule;
}
