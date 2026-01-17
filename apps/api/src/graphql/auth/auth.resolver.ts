/**
 * GraphQL resolver for authentication
 */

import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';
import { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from './auth.input';
import { AuthResponse, MessageResponse, UserType } from './auth.types';
import { Public } from '../../common/decorators/public.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  async register(@Args('input') input: RegisterInput): Promise<AuthResponse> {
    const result = await this.authService.register({
      email: input.email,
      password: input.password,
      name: input.username,
    });
    return {
      token: result.data.token,
      user: {
        id: result.data.user.id,
        email: result.data.user.email,
        username: result.data.user.name,
        createdAt: undefined, // createdAt not returned from service
      },
    };
  }

  @Public()
  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    const result = await this.authService.login({
      email: input.email,
      password: input.password,
    });
    return {
      token: result.data.token,
      user: {
        id: result.data.user.id,
        email: result.data.user.email,
        username: result.data.user.name,
        createdAt: undefined, // createdAt not returned from service
      },
    };
  }

  @Public()
  @Mutation(() => MessageResponse)
  async forgotPassword(@Args('input') input: ForgotPasswordInput): Promise<MessageResponse> {
    const result = await this.authService.forgotPassword({
      email: input.email,
    });
    return {
      message: result.message || 'Password reset email sent',
      token: result.data?.token,
    };
  }

  @Public()
  @Mutation(() => MessageResponse)
  async resetPassword(@Args('input') input: ResetPasswordInput): Promise<MessageResponse> {
    await this.authService.resetPassword({
      token: input.token,
      newPassword: input.newPassword,
    });
    return {
      message: 'Password reset successfully',
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserType)
  async me(@CurrentUser() userId: string): Promise<UserType> {
    const user = await this.authService.validateUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      username: user.name || user.email.split('@')[0],
      createdAt: user.createdAt?.toISOString(),
    };
  }
}
