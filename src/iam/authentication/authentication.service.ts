import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { PG_UNIQUE_VIOLATION_ERROR_CODE } from 'src/common/constant/keys.constant';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ActiveUserData } from '../interface/active-user-data-interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);

      await this.usersRepository.save(user);
    } catch (error) {
      const pgUniqueViolationErrorCode = PG_UNIQUE_VIOLATION_ERROR_CODE;
      if (error.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const isEqual = await this.hashingService.compare(
      user.email,
      signInDto.email,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return await this.generateToken(user);
  }

  async generateToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.configService.get('jwt.accessTokenTtl'),
        {
          email: user.email,
        },
      ),
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.configService.get('jwt.refreshTokenTtl'),
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.configService.get('jwt.secret'),
        audience: this.configService.get('jwt.audience'),
        issuer: this.configService.get('jwt.issuer'),
      });
      const user = await this.usersRepository.findOneByOrFail({ id: sub });
      return this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.configService.get('jwt.audience'),
        issuer: this.configService.get('jwt.issuer'),
        secret: this.configService.get('jwt.secret'),
        expiresIn,
      },
    );
  }
}
