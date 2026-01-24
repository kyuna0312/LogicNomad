/**
 * JWT Auth Guard - protects routes requiring authentication
 * Handles both REST and GraphQL contexts
 */

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    // Check if this is a GraphQL context
    const contextType = context.getType<'http' | 'graphql'>();
    
    if (contextType === 'graphql') {
      // For GraphQL, extract request from GraphQL context
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
    
    // For REST, use the standard request
    return context.switchToHttp().getRequest();
  }

  canActivate(context: ExecutionContext) {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Allow access to public routes
    }

    // For GraphQL, skip this guard - use GqlAuthGuard instead
    // GraphQL resolvers explicitly use @UseGuards(GqlAuthGuard)
    const contextType = context.getType<'http' | 'graphql'>();
    if (contextType === 'graphql') {
      // GraphQL routes should use GqlAuthGuard, not this guard
      // Return true to skip this guard for GraphQL
      return true;
    }

    // For REST routes, use Passport JWT authentication
    // JWT doesn't require sessions, so we can safely call super.canActivate
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, _info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Нэвтрэх шаардлагатай');
    }
    return user;
  }
}
