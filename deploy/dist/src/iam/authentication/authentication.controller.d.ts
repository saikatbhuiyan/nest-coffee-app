import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    signUp(signUpDto: SignUpDto): Promise<import("../../users/entities/user.entity").User>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signIn2(response: Response, signInDto: SignInDto): Promise<void>;
}
