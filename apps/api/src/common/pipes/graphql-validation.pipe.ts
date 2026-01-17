/**
 * Custom ValidationPipe that skips GraphQL routes
 * GraphQL has its own type validation system
 */

import { ValidationPipe, ArgumentMetadata, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class GraphQLValidationPipe extends ValidationPipe {
  // Override transform to skip validation for GraphQL inputs
  async transform(value: any, metadata: ArgumentMetadata, context?: ExecutionContext) {
    // If we have a context, check if it's GraphQL
    if (context) {
      try {
        const gqlCtx = GqlExecutionContext.create(context);
        if (gqlCtx) {
          // This is a GraphQL context, skip validation
          // GraphQL handles its own type validation
          return value;
        }
      } catch {
        // Not a GraphQL context, continue with validation
      }
    }

    // Also check by metadata type - GraphQL inputs typically end with "Input"
    if (metadata.metatype?.name?.endsWith('Input')) {
      return value;
    }

    // For REST endpoints, use normal validation
    return super.transform(value, metadata);
  }
}
