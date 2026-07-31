import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
export declare class AuthenticationService {
    private readonly usersRepository;
    private readonly hashingService;
    private readonly jwtService;
    private readonly configService;
    private readonly refreshTokenIdsStorage;
    constructor(usersRepository: Repository<User>, hashingService: HashingService, jwtService: JwtService, configService: ConfigService, refreshTokenIdsStorage: RefreshTokenIdsStorage);
    signUp(signUpDto: SignUpDto): Promise<User>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateToken(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signToken<T>(userId: number, expiresIn: number, payload?: T): Promise<string>;
}
