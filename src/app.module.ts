import * as Joi from 'joi';
import { Module, Logger } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { IamModule } from './iam/iam.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import appConfig from './config/app.config';
import { AppConfig } from './config/config.types';
import { HttpClientModule } from './http-client/http-client.module';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        JWT_SECRET: Joi.string().required(),
        JWT_TOKEN_AUDIENCE: Joi.string().optional(),
        JWT_TOKEN_ISSUER: Joi.string().optional(),
        JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
        JWT_REFRESH_TOKEN_TTL: Joi.number().default(86400),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<AppConfig['database']>('database');
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          autoLoadEntities: true,
          synchronize: false,
          logging: true,
          retryAttempts: 2,
          retryDelay: 3000,
          verboseRetryLog: true,
        };
      },
      dataSourceFactory: async (options: DataSourceOptions) => {
        const logger = new Logger('TypeORM');
        const dataSource = new DataSource(options);
        try {
          await dataSource.initialize();
          logger.log('Database connected successfully');
        } catch (error) {
          logger.error(
            `Database connection failed: ${error.message}. App will continue without database.`,
          );
          (dataSource as any).isInitialized = true;
        }
        return dataSource;
      },
    }),

    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { environment } = configService.get<AppConfig>('environment');

        const isProduction = environment === 'production';
        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: { singleLine: true },
                },
            level: isProduction ? 'info' : 'debug',
          },
        };
      },
    }),

    CoffeesModule,
    CoffeeRatingModule,
    CommonModule,
    UsersModule,
    IamModule,
    SchedulerModule,
    CronModule,
    FibonacciModule,
    HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),
    HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),
    HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),
    // Alternatively:
    // HttpClientModule. registerAsync({
    // useFactory: () = ({ baseUrl: 'http://nestjs.com' }),
    // 7),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
