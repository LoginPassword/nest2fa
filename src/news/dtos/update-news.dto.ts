import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MinLength, IsEnum, IsInt, Min } from 'class-validator';
import { NewsStatus } from 'src/database/entities/News';

export class UpdateNewsDto {
  @ApiPropertyOptional({ example: 'News title' })
  @IsOptional()
  @IsString()
  @Length(1, 500)
  name?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  @Length(1, 500)
  cover?: string;

  @ApiPropertyOptional({ example: 'News description' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @ApiPropertyOptional({ example: 'News full text' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  fullText?: string;

  @IsOptional()
  @IsEnum(NewsStatus)
  status?: NewsStatus;

  @IsOptional()
  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Min(1)
  creatorId?: number;
}
