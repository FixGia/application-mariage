import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {

  @IsString()
  @MinLength(6)
  userId: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

