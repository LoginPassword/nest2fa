import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatus } from 'src/database/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dtos/user-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser({ phone, email, role, password }: CreateUserDto): Promise<UserResponseDto> {
    const existingEmailOrPhone = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (existingEmailOrPhone?.email === email) {
      throw new BadRequestException('Email already in use');
    }
    if (existingEmailOrPhone?.phone === phone) {
      throw new BadRequestException('Phone already in use');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.userRepository.save({
      email,
      phone,
      passwordHash,
      role,
      status: UserStatus.ACTIVE,
    });

    return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return plainToClass(UserResponseDto, users, { excludeExtraneousValues: true });
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async updateUser(id: number, dto: any) {
    const { password, ...rest } = dto;
    if (password) {
      const salt = await bcrypt.genSalt();
      rest.passwordHash = await bcrypt.hash(password, salt);
    }

    if (rest.phone || rest.email) {
      const where = [];
      if (rest.email) where.push({ email: rest.email });
      if (rest.phone) where.push({ phone: rest.phone });

      const existingEmailOrPhone = await this.userRepository.findOne({
        where,
      });

      if (existingEmailOrPhone?.email === rest.email) {
        throw new BadRequestException('Email already in use');
      }
      if (existingEmailOrPhone?.phone === rest.phone) {
        throw new BadRequestException('Phone already in use');
      }
    }

    await this.userRepository.update({ id }, rest);
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async getUserByPhone(phone: string) {
    return this.userRepository.findOne({ where: { phone } });
  }
}
