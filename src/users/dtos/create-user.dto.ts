import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserRole } from 'src/database/entities/user';

export function NormalizePhone() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.replace(/[^\d+]/g, '').replace(/(^\d)(.+)/, '+$1$2');
    }
    return value;
  });
}

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com' })
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
