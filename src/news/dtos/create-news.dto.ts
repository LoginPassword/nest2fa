import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsInt, IsString, Length, Min, MinLength } from 'class-validator';
import { NewsStatus } from 'src/database/entities/News';

export class CreateNewsDto {
  @ApiProperty({ example: 'News title' })
  @IsDefined()
  @IsString()
  @Length(1, 500)
  name: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsDefined()
  @IsString()
  @Length(1, 500)
  cover: string;

  @ApiProperty({ example: 'News description' })
  @IsDefined()
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty({ example: 'News full text' })
  @IsDefined()
  @IsString()
  @MinLength(1)
  fullText: string;

  @IsDefined()
  @IsEnum(NewsStatus)
  status: NewsStatus;

  @IsDefined()
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  creatorId: number;
}
