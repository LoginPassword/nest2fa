import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { NormalizePhone } from 'src/users/dtos/create-user.dto';

export class PhoneLoginDto {
  @ApiProperty({ example: '+998987654321' })
  @IsDefined()
  @IsString()
  @NormalizePhone()
  phone: string;
}
