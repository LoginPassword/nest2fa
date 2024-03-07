import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NewsResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'News name' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @Expose()
  cover: string;

  @ApiProperty({ example: 'News description' })
  @Expose()
  description: string;

  @ApiProperty({ example: 'News full text' })
  @Expose()
  fullText: string;

  @ApiProperty({ example: 'ACTIVE' })
  @Expose()
  status: string;

  @ApiProperty({ example: 1 })
  @Expose()
  creatorId: number;

  @ApiProperty({ example: '2021-08-01T00:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2021-08-01T00:00:00.000Z' })
  @Expose()
  updatedAt: Date;
}
