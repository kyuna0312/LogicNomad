/**
 * User DTOs (for service layer)
 * Note: TypeORM entity is in ../entities/user.entity.ts
 */

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}
