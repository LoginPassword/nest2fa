import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { SmsServiceModule } from 'src/sms-service/sms-service.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshToken } from 'src/database/entities/Refresh-token';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    UsersModule,
    SmsServiceModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
})
export class AuthModule {}
