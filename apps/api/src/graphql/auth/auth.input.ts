/**
 * GraphQL input types for authentication
 */

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  username?: string;
}

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class ForgotPasswordInput {
  @Field()
  email!: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  token!: string;

  @Field()
  newPassword!: string;
}
