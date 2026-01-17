/**
 * Database configuration for TypeORM
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserProgress } from '../entities/user-progress.entity';

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'logicnomad',
  password: process.env.DB_PASSWORD || 'logicnomad_dev_password_123',
  database: process.env.DB_NAME || 'logicnomad',
  entities: [User, UserProgress],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-sync schema in development
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  // Connection pooling optimizations
  extra: {
    max: parseInt(process.env.DB_POOL_MAX || '10', 10), // Maximum pool size
    min: parseInt(process.env.DB_POOL_MIN || '2', 10), // Minimum pool size
    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30000', 10),
    connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT || '2000', 10),
  },
  // Query optimization
  maxQueryExecutionTime: 1000, // Log slow queries (>1s)
  // Cache configuration (can be enabled with Redis later)
  // cache: process.env.REDIS_URL ? {
  //   type: 'redis',
  //   options: { url: process.env.REDIS_URL },
  //   duration: 30000,
  // } : false,
});
