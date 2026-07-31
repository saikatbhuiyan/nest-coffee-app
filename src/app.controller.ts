import { Controller, Get } from '@nestjs/common';
import { AppService, HealthCheckResult } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './iam/authentication/decorators/auth.decorator';
import { AuthType } from './iam/authentication/enums/auth-type.enum';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Auth(AuthType.None)
  @Get('health')
  async healthCheck(): Promise<HealthCheckResult> {
    return this.appService.healthCheck();
  }
}
