import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatus } from 'src/database/entities/user';
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
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserByPhone(phone: string) {
    return this.userRepository.findOne({ where: { phone } });
  }
}
