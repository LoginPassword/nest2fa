import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PhoneLoginDto } from './dtos/phone-login.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
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
  @ApiOperation({ summary: 'Send phone number for get sms code' })
  async phoneLogin(@Body() dto: PhoneLoginDto) {
    return this.authService.phoneLogin(dto.phone);
  }

  @Post('phone-login-verify')
  @ApiCreatedResponse({
    description: 'Phone verified, need to type email and password in next route',
    type: PhoneLoginVerifyResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid or expired code' })
  @ApiOperation({ summary: 'Send phone and code for get phone token and enter email and password' })
  async phoneLoginVerify(@Body() dto: PhoneLoginVerifyDto) {
    return this.authService.phoneLoginVerify(dto.phone, dto.code);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with phone token, email and password' })
  @ApiUnauthorizedResponse({ description: 'Invalid token, login or password' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.token, dto.email, dto.password);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiUnauthorizedResponse({ description: 'Invalid token' })
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }
}
