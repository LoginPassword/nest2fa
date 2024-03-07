import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaCIsImlkIjoxNiwiaWF0IjoxNzA5ODQzMzczLCJleHAiOjE3MTI0MzUzNzN9.FHSuRrDc4oeNZS7jw67WX55PWt-s7X0-RerlDlxhLsM',
  })
  @IsDefined()
  @IsString()
  refreshToken: string;
}
