import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import appConfig from 'src/config/app.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // JwtModule.registerAsync(appConfig['jwt'].asProvider()),
    ConfigModule.forFeature(appConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    },
    AuthenticationService,
    JwtService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
