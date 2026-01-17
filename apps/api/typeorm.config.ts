/**
 * TypeORM configuration for CLI (migrations, etc.)
 */

import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { UserProgress } from './src/entities/user-progress.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'logicnomad',
  password: process.env.DB_PASSWORD || 'logicnomad_dev_password_123',
  database: process.env.DB_NAME || 'logicnomad',
  entities: [User, UserProgress],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Never use synchronize in production
  logging: process.env.NODE_ENV === 'development',
});
