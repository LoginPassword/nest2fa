import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length, IsEnum, IsOptional } from 'class-validator';
import { NormalizePhone } from 'src/common/normalizePhone.decorator';
import { UserRole } from 'src/database/entities/User';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user@mail.com' })
  @Transform((param) => param.value.toLowerCase())
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+998987654321' })
  // @IsPhoneNumber() // Not validation Uzbekistan and Georgia phone number :(
  @IsString()
  @NormalizePhone()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: '**********' })
  @IsString()
  @Length(6, 100)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
