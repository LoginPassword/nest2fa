import { ApiProperty } from '@nestjs/swagger/dist';
import { Expose } from 'class-transformer';

export class PhoneLoginVerifyResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicGhvbmVWZXJpZmllZCIsInBob25lIjoiMiIsImlhdCI6MTcwOTgzNTY2NiwiZXhwIjoxNzA5ODM2MjY2fQ.HSurOYOeT9RGitd2GgY4eMVwuOwcmtek_IXQwY_5yow',
  })
  @Expose()
  token: string;

  @ApiProperty({ example: '+998987654321' })
  @Expose()
  phone: string;
}
