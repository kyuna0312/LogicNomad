/**
 * Authentication service - handles login, registration, password reset
 */

import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from '../users/users.dto';
import { jwtConstants } from '../config/jwt.config';
import { User } from '../entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.create(registerDto);
      const token = this.generateToken(user.id);

      return {
        success: true,
        message: 'Бүртгэл амжилттай',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          token,
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Бүртгэл үүсгэхэд алдаа гарлаа');
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Имэйл эсвэл нууц үг буруу байна');
    }

    const isValid = await this.usersService.validatePassword(user, loginDto.password);
    if (!isValid) {
      throw new UnauthorizedException('Имэйл эсвэл нууц үг буруу байна');
    }

    const token = this.generateToken(user.id);

    return {
      success: true,
      message: 'Амжилттай нэвтэрлээ',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const token = crypto.randomBytes(32).toString('hex');
    await this.usersService.setResetPasswordToken(forgotPasswordDto.email, token);

    // In production, send email with reset link
    // For now, return token (should be sent via email)
    return {
      success: true,
      message: 'Нууц үг сэргээх холбоос имэйл хаяг руу илгээгдлээ',
      data: {
        token, // In production, don't return token, send via email
      },
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    await this.usersService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);

    return {
      success: true,
      message: 'Нууц үг амжилттай солигдлоо',
    };
  }

  async validateUser(userId: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private generateToken(userId: string): string {
    const payload = { userId, sub: userId };
    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn,
    });
  }
}
