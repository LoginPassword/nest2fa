import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PhoneLoginDto } from './dtos/phone-login.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PhoneLoginVerifyDto } from './dtos/phone-login-verify.dto';
import { PhoneLoginVerifyResponseDto } from './dtos/phone-login-verify-response.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshDto } from './dtos/refresh.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('phone-login')
  @ApiCreatedResponse({ description: 'SMS sent to phone' })
  @ApiBadRequestResponse({ description: 'Phone not found' })
  @ApiInternalServerErrorResponse({ description: 'Failed to send SMS' })
  async phoneLogin(@Body() dto: PhoneLoginDto) {
    return this.authService.phoneLogin(dto.phone);
  }

  @Post('phone-login-verify')
  @ApiCreatedResponse({
    description: 'Phone verified, need to type email and password in next route',
    type: PhoneLoginVerifyResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid or expired code' })
  async phoneLoginVerify(@Body() dto: PhoneLoginVerifyDto) {
    return this.authService.phoneLoginVerify(dto.phone, dto.code);
  }

  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Invalid token, login or password' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.token, dto.email, dto.password);
  }

  @Post('refresh')
  @ApiUnauthorizedResponse({ description: 'Invalid token' })
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }
}
