/**
 * GraphQL resolver for users
 */

import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UsersService } from '../../users/users.service';
import { ChangePasswordInput, ChangeEmailInput, VerifyEmailInput, ProgressInput } from './users.input';
import { ProgressType } from './users.types';
import { MessageResponse } from '../auth/auth.types';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageResponse)
  async changePassword(
    @CurrentUser() userId: string,
    @Args('input') input: ChangePasswordInput,
  ): Promise<MessageResponse> {
    await this.usersService.changePassword(userId, {
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    });
    return { message: 'Password changed successfully' };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageResponse)
  async changeEmail(
    @CurrentUser() userId: string,
    @Args('input') input: ChangeEmailInput,
  ): Promise<MessageResponse> {
    // Generate token (in production, send email with token)
    const token = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await this.usersService.setEmailChangeToken(userId, input.newEmail, token);
    return { message: 'Email change verification sent', token };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageResponse)
  async verifyEmailChange(
    @CurrentUser() _userId: string,
    @Args('input') input: VerifyEmailInput,
  ): Promise<MessageResponse> {
    await this.usersService.changeEmail(input.token);
    return { message: 'Email changed successfully' };
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProgressType)
  async getProgress(@CurrentUser() userId: string): Promise<ProgressType> {
    const progress = await this.usersService.getUserProgress(userId);
    return {
      completedLevels: progress.completedLevels || [],
      currentProgress: progress.currentProgress || 0,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageResponse)
  async saveProgress(
    @CurrentUser() userId: string,
    @Args('input') input: ProgressInput,
  ): Promise<MessageResponse> {
    await this.usersService.saveUserProgress(userId, {
      completedLevels: input.completedLevels,
      currentProgress: input.currentProgress,
    });
    return { message: 'Progress saved successfully' };
  }
}
