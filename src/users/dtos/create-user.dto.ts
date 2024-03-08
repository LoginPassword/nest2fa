import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { NormalizePhone } from 'src/common/normalizePhone.decorator';
import { UserRole } from 'src/database/entities/User';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com' })
  @IsDefined()
  @Transform((param) => param.value.toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998987654321' })
  // @IsPhoneNumber() // Not validation Uzbekistan and Georgia phone number :(
  @IsDefined()
  @IsString()
  @NormalizePhone()
  phone: string;

  @ApiProperty({ example: '**********' })
  @IsDefined()
  @IsString()
  @Length(6, 100)
  password: string;

  @IsDefined()
  @IsEnum(UserRole)
  role: UserRole;
}
