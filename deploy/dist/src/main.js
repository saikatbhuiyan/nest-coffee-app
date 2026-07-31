"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const wrap_response_interceptor_1 = require("./common/interceptors/wrap-response/wrap-response.interceptor");
const timeout_interceptor_1 = require("./common/interceptors/timeout/timeout.interceptor");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.flushLogs();
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new wrap_response_interceptor_1.WrapResponseInterceptor(), new timeout_interceptor_1.TimeoutInterceptor());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('CoffeeScript')
        .setDescription('Coffee application')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'Authorization')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(configService.get('app_port'));
}
bootstrap();
//# sourceMappingURL=main.js.map