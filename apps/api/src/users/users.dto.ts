/**
 * User DTOs for validation
 */

import { IsEmail, IsString, MinLength, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Имэйл хаяг буруу байна' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Нууц үг нь том, жижиг үсэг болон тоо агуулах ёстой',
  })
  password!: string;

  @IsOptional()
  @IsString()
  name?: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Имэйл хаяг буруу байна' })
  email!: string;

  @IsString()
  password!: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword!: string;

  @IsString()
  @MinLength(6, { message: 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Нууц үг нь том, жижиг үсэг болон тоо агуулах ёстой',
  })
  newPassword!: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Имэйл хаяг буруу байна' })
  email!: string;
}

export class ResetPasswordDto {
  @IsString()
  token!: string;

  @IsString()
  @MinLength(6, { message: 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Нууц үг нь том, жижиг үсэг болон тоо агуулах ёстой',
  })
  newPassword!: string;
}

export class ChangeEmailDto {
  @IsEmail({}, { message: 'Имэйл хаяг буруу байна' })
  newEmail!: string;

  @IsString()
  password!: string;
}

export class VerifyEmailChangeDto {
  @IsString()
  token!: string;
}
