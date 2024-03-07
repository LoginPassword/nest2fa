import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator';
import { NormalizePhone } from 'src/users/dtos/create-user.dto';

export class PhoneLoginVerifyDto {
  @ApiProperty({ example: '+998987654321' })
  @IsDefined()
  @IsString()
  @NormalizePhone()
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(6)
  code: string;
}
