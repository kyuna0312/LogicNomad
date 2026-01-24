import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { Request, Response } from 'express';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { GqlThrottlerGuard } from './common/guards/gql-throttler.guard';
import { AuthResolver } from './graphql/auth/auth.resolver';
import { UsersResolver } from './graphql/users/users.resolver';
import { getDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true, // Cache environment variables
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: process.env.GRAPHQL_PLAYGROUND !== 'false' && process.env.NODE_ENV !== 'production',
      introspection: process.env.GRAPHQL_INTROSPECTION !== 'false' && process.env.NODE_ENV !== 'production',
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
      plugins: [],
      // Enable query complexity analysis
      validationRules: process.env.NODE_ENV === 'production' ? [
        // Add query complexity validation in production
      ] : [],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    // Only apply JwtAuthGuard to REST routes (not GraphQL)
    // GraphQL routes use GqlAuthGuard explicitly on resolvers
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard, // Use GraphQL-compatible throttler
    },
    AuthResolver,
    UsersResolver,
  ],
})
export class AppModule {}
