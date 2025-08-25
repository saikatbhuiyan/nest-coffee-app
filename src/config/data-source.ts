import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './app.config';

ConfigModule.forRoot({ load: [appConfig] });
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
