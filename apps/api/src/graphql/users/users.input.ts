/**
 * GraphQL input types for users
 */

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword!: string;

  @Field()
  newPassword!: string;
}

@InputType()
export class ChangeEmailInput {
  @Field()
  newEmail!: string;
}

@InputType()
export class VerifyEmailInput {
  @Field()
  token!: string;
}

@InputType()
export class ProgressInput {
  @Field(() => [String])
  completedLevels!: string[];

  @Field({ nullable: true })
  currentProgress?: number;
}
