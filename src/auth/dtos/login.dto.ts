import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsDefined, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicGhvbmVWZXJpZmllZCIsInBob25lIjoiKzk5NTU5MTQ0Mzc4OSIsImlhdCI6MTcwOTgzNjU3MywiZXhwIjoxNzE1ODM2NTczfQ.sdk-94HRErFN7QnhYQPRrYamVf96-eUbJuL6xpemrTk',
  })
  @IsDefined()
  @IsString()
  token: string;

  @ApiProperty({ example: 'user@mail.com' })
  @Transform((param) => param.value.toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ example: '**********' })
  @IsDefined()
  @IsString()
  @Length(6, 100)
  password: string;
}
