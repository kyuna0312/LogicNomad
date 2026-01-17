/**
 * GraphQL types for users
 */

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProgressType {
  @Field(() => [String])
  completedLevels!: string[];

  @Field()
  currentProgress!: number;
}

// Note: MessageResponse is exported from auth.types.ts to avoid duplication
