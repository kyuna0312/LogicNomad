/**
 * Users controller - handles user-related endpoints
 */

import { Controller, Get, Put, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto, ChangeEmailDto } from './users.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getCurrentUser(@CurrentUser() userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      return { success: false, message: 'Хэрэглэгч олдсонгүй' };
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
    };
  }

  @Put('password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@CurrentUser() userId: string, @Body() changePasswordDto: ChangePasswordDto) {
    await this.usersService.changePassword(userId, changePasswordDto);
    return {
      success: true,
      message: 'Нууц үг амжилттай солигдлоо',
    };
  }

  @Put('email')
  @HttpCode(HttpStatus.OK)
  async changeEmail(@CurrentUser() userId: string, @Body() changeEmailDto: ChangeEmailDto) {
    // Verify password first
    const user = await this.usersService.findById(userId);
    if (!user) {
      return { success: false, message: 'Хэрэглэгч олдсонгүй' };
    }

    const isValid = await this.usersService.validatePassword(user, changeEmailDto.password);
    if (!isValid) {
      return { success: false, message: 'Нууц үг буруу байна' };
    }

    // Generate token (in production, send email with token)
    const token = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await this.usersService.setEmailChangeToken(userId, changeEmailDto.newEmail, token);

    // In production, send email with verification link
    // For now, return token (should be sent via email)
    return {
      success: true,
      message: 'Имэйл солих баталгаажуулалт илгээгдлээ',
      data: {
        token, // In production, don't return token, send via email
      },
    };
  }

  @Put('email/verify')
  @HttpCode(HttpStatus.OK)
  async verifyEmailChange(@Body() body: { token: string }) {
    await this.usersService.changeEmail(body.token);
    return {
      success: true,
      message: 'Имэйл амжилттай солигдлоо',
    };
  }

  @Get('progress')
  async getProgress(@CurrentUser() userId: string) {
    const progress = await this.usersService.getUserProgress(userId);
    return {
      success: true,
      data: progress,
    };
  }

  @Put('progress')
  @HttpCode(HttpStatus.OK)
  async saveProgress(@CurrentUser() userId: string, @Body() progress: any) {
    await this.usersService.saveUserProgress(userId, progress);
    return {
      success: true,
      message: 'Ахиц амжилттай хадгалагдлаа',
    };
  }
}
