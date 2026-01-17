/**
 * GraphQL types for authentication
 */

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  createdAt?: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  token!: string;

  @Field(() => UserType)
  user!: UserType;
}

@ObjectType()
export class MessageResponse {
  @Field()
  message!: string;

  @Field({ nullable: true })
  token?: string;
}
