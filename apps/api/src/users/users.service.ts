/**
 * Users service - manages user data and operations with TypeORM
 */

import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserProgress } from '../entities/user-progress.entity';
import { CreateUserDto, UpdateUserDto } from './user.entity';
import { ChangePasswordDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProgress)
    private readonly progressRepository: Repository<UserProgress>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, name } = createUserDto;

    // Check if user already exists (only check email, no need to load full entity)
    const existingUser = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
      select: ['id'], // Only select id for existence check
    });

    if (existingUser) {
      throw new ConflictException('Энэ имэйл хаяг аль хэдийн бүртгэгдсэн байна');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = this.userRepository.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || email.split('@')[0],
      emailVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    // Create initial progress for user
    const progress = this.progressRepository.create({
      userId: savedUser.id,
      completedLevels: [],
      currentProgress: 0,
    });
    await this.progressRepository.save(progress);

    // Return user without password
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase() },
      // Don't load relations unless needed
      relations: [],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Хэрэглэгч олдсонгүй');
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Хэрэглэгч олдсонгүй');
    }

    // Verify current password
    const isValid = await this.validatePassword(user, changePasswordDto.currentPassword);
    if (!isValid) {
      throw new UnauthorizedException('Одоогийн нууц үг буруу байна');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await this.userRepository.save(user);
  }

  async setResetPasswordToken(email: string, token: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists
      return;
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await this.userRepository.save(user);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { resetPasswordToken: token },
    });

    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Нууц үг сэргээх токен хүчинтэй биш эсвэл хугацаа дууссан');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await this.userRepository.save(user);
  }

  async setEmailChangeToken(userId: string, newEmail: string, token: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Хэрэглэгч олдсонгүй');
    }

    // Check if new email is already taken
    const existingUser = await this.userRepository.findOne({
      where: { email: newEmail.toLowerCase() },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException('Энэ имэйл хаяг аль хэдийн ашиглагдаж байна');
    }

    user.emailChangeToken = token;
    user.emailChangeExpires = new Date(Date.now() + 3600000); // 1 hour
    user.newEmail = newEmail.toLowerCase();
    await this.userRepository.save(user);
  }

  async changeEmail(token: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { emailChangeToken: token },
    });

    if (!user || !user.emailChangeExpires || user.emailChangeExpires < new Date() || !user.newEmail) {
      throw new BadRequestException('Имэйл солих токен хүчинтэй биш эсвэл хугацаа дууссан');
    }

    // Update email
    user.email = user.newEmail;
    user.newEmail = undefined;
    user.emailChangeToken = undefined;
    user.emailChangeExpires = undefined;
    await this.userRepository.save(user);
  }

  async getUserProgress(userId: string): Promise<{ completedLevels: string[]; currentProgress: number }> {
    const progress = await this.progressRepository.findOne({
      where: { userId },
      select: ['completedLevels', 'currentProgress'], // Only select needed fields
    });

    if (!progress) {
      // Create default progress if it doesn't exist
      const newProgress = this.progressRepository.create({
        userId,
        completedLevels: [],
        currentProgress: 0,
      });
      const saved = await this.progressRepository.save(newProgress);
      return {
        completedLevels: saved.completedLevels || [],
        currentProgress: saved.currentProgress || 0,
      };
    }

    return {
      completedLevels: progress.completedLevels || [],
      currentProgress: progress.currentProgress || 0,
    };
  }

  async saveUserProgress(
    userId: string,
    progress: { completedLevels: string[]; currentProgress?: number },
  ): Promise<void> {
    let userProgress = await this.progressRepository.findOne({
      where: { userId },
    });

    if (!userProgress) {
      userProgress = this.progressRepository.create({
        userId,
        completedLevels: progress.completedLevels || [],
        currentProgress: progress.currentProgress || 0,
      });
    } else {
      userProgress.completedLevels = progress.completedLevels || [];
      if (progress.currentProgress !== undefined) {
        userProgress.currentProgress = progress.currentProgress;
      }
    }

    await this.progressRepository.save(userProgress);
  }
}
