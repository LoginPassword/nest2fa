import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRole, UserStatus } from 'src/database/entities/user';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'user@mail.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: '+998987654321' })
  @Expose()
  phone: string;

  @Expose()
  role: UserRole;

  @Expose()
  status: UserStatus;
}
