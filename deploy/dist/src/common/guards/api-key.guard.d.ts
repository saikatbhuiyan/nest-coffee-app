import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
export declare class ApiKeyGuard implements CanActivate {
    private readonly reflector;
    private readonly configService;
    private readonly logger;
    constructor(reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
