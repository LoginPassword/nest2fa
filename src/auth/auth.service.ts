import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SmsServiceService } from 'src/sms-service/sms-service.service';
import { UsersService } from 'src/users/users.service';
import { plainToClass } from 'class-transformer';
import { PhoneLoginVerifyResponseDto } from './dtos/phone-login-verify-response.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokensResponseDto } from './dtos/tokens-response.dto';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/database/entities/Refresh-token';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,

    private readonly usersService: UsersService,
    private readonly smsServiceService: SmsServiceService,
    private readonly jwtService: JwtService,
  ) {}

  async phoneLogin(phone: string) {
    const user = await this.usersService.getUserByPhone(phone);
    if (!user) {
      throw new BadRequestException('Phone not found');
    }

    try {
      await this.smsServiceService.sendAuthSmsCode(phone);
    } catch (error) {
      // some provider error
      throw new InternalServerErrorException('Failed to send SMS');
    }
  }

  async phoneLoginVerify(phone: string, code: string) {
    try {
      await this.smsServiceService.verifyAuthSmsCode(phone, code);
    } catch (error) {
      throw new BadRequestException('Invalid or expired code');
    }

    const token = this.jwtService.sign({ type: 'phoneVerified', phone }, { expiresIn: '10m' });

    return plainToClass(PhoneLoginVerifyResponseDto, { token, phone }, { excludeExtraneousValues: true });
  }

  async login(phoneToken: string, email: string, password: string) {
    let phone: string;
    try {
      const phoneTokenData = this.jwtService.verify(phoneToken);
      if (phoneTokenData.type !== 'phoneVerified') {
        throw new Error('Wrong token');
      }
      phone = phoneTokenData.phone;
    } catch (error) {
      throw new UnauthorizedException('Invalid token, login or password');
    }

    const user = await this.usersService.getUserByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Invalid token, login or password');
    }

    if (user.email !== email) {
      throw new UnauthorizedException('Invalid token, login or password');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid token, login or password');
    }

    const { id, role, status } = user;

    const authToken = this.jwtService.sign({ type: 'auth', id, role, status, email, phone }, { expiresIn: '60m' });
    const refreshToken = this.jwtService.sign({ type: 'refresh', id }, { expiresIn: '30d' });

    await this.refreshTokenRepository.upsert([{ userId: id, token: refreshToken }], ['token']);

    return plainToClass(TokensResponseDto, { authToken, refreshToken }, { excludeExtraneousValues: true });
  }

  async refresh(refreshToken: string) {
    let id: number;
    try {
      const refreshTokenData = this.jwtService.verify(refreshToken);
      if (refreshTokenData.type !== 'refresh') {
        throw new Error('Wrong token');
      }
      id = refreshTokenData.id;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = await this.refreshTokenRepository.findOne({ where: { userId: id, token: refreshToken } });
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const { role, status, email, phone } = user;

    const authToken = this.jwtService.sign({ type: 'auth', id, role, status, email, phone }, { expiresIn: '60m' });
    const newRefreshToken = this.jwtService.sign({ type: 'refresh', id }, { expiresIn: '30d' });

    await this.refreshTokenRepository.update({ userId: id }, { token: newRefreshToken });

    return plainToClass(
      TokensResponseDto,
      { authToken, refreshToken: newRefreshToken },
      { excludeExtraneousValues: true },
    );
  }
}
