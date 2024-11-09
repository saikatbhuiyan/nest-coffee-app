import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string = 'example@gmail.com';

  @MinLength(6)
  password: string;
}
