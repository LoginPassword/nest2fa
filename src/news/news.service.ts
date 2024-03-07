import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dtos/create-news.dto';
import { UpdateNewsDto } from './dtos/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/database/entities/News';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { NewsResponseDto } from './dtos/news-response.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async getNews() {
    const news = await this.newsRepository.find();

    return plainToClass(NewsResponseDto, news, { excludeExtraneousValues: true });
  }

  async getNewsById(id: number) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) throw new NotFoundException('News not found');

    return plainToClass(NewsResponseDto, news, { excludeExtraneousValues: true });
  }

  async createNews(dto: CreateNewsDto, creatorId: number) {
    const news = this.newsRepository.save({ ...dto, creatorId });

    return plainToClass(NewsResponseDto, news, { excludeExtraneousValues: true });
  }

  async updateNews(id: number, dto: UpdateNewsDto) {
    let news = await this.newsRepository.findOne({ where: { id } });
    if (!news) throw new NotFoundException('News not found');

    news = { ...news, ...dto, id };
    await this.newsRepository.save(news);

    return plainToClass(NewsResponseDto, news, { excludeExtraneousValues: true });
  }

  async deleteNews(id: number) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) throw new NotFoundException('News not found');

    await this.newsRepository.delete({ id });
  }
}
