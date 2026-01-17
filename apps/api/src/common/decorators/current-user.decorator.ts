/**
 * Current user decorator - extracts user ID from JWT token
 * Works with both REST and GraphQL contexts
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    // Check if it's a GraphQL context
    const gqlCtx = GqlExecutionContext.create(ctx);
    const request = gqlCtx.getContext().req;
    
    if (request) {
      return request.user?.userId || request.user;
    }
    
    // Fall back to HTTP context
    const httpRequest = ctx.switchToHttp().getRequest();
    return httpRequest.user?.userId || httpRequest.user;
  },
);
