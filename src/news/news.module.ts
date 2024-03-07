import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News } from 'src/database/entities/News';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [TypeOrmModule.forFeature([News])],
})
export class NewsModule {}
