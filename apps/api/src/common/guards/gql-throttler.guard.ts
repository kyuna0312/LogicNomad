/**
 * GraphQL Throttler Guard - handles rate limiting for GraphQL
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    
    // Ensure res exists, create a minimal mock if it doesn't
    const res = ctx.res || this.createMockResponse();
    
    return { req: ctx.req, res };
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Use IP from request, fallback to 'unknown' if not available
    return req.ip || req.headers?.['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
  }

  private createMockResponse(): Partial<Response> {
    // Create a minimal response object with required methods
    const mockRes: Partial<Response> = {
      header: function(_name: string, _value: string) {
        return this as Response;
      },
      setHeader: function(_name: string, _value: string) {
        return this as Response;
      },
      statusCode: 200,
    } as Partial<Response>;
    
    return mockRes;
  }
}
