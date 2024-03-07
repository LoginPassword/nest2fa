import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokensResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXV0aCIsImlkIjoxNiwicm9sZSI6IlVTRVIiLCJzdGF0dXMiOiJBQ1RJVkUiLCJlbWFpbCI6Im1hcmtvdjk2QHlhaG9vLmNvbSIsInBob25lIjoiKzk5NTU5MTQ0Mzc4OSIsImlhdCI6MTcwOTg0MTgxNCwiZXhwIjoxNzA5ODQ1NDE0fQ.bNjlt8hC7WfjlTGW5CUkLJXcPhuT7i0sHb-rdvO1ZXE',
    description: 'lifetime 60m',
  })
  @Expose()
  authToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaCIsImlkIjoxNiwiaWF0IjoxNzA5ODQxODE0LCJleHAiOjE3MTI0MzM4MTR9.EiXKvoXC5F5EXDVqCQRy7usL0GbHIaxN-D9i2VbMSgY',
    description: 'lifetime 30d',
  })
  @Expose()
  refreshToken: string;
}
