import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { NewsService } from './news.service';
import { IdIntParamDto } from 'src/common/id-int-param.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/database/entities/user';
import { UpdateNewsDto } from './dtos/update-news.dto';
import { CreateNewsDto } from './dtos/create-news.dto';
import { GetUser, JwtUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('news')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @Roles(UserRole.USER)
  async getNews() {
    return this.newsService.getNews();
  }

  @Get(':id')
  @Roles(UserRole.USER)
  async getNewsById(@Param() { id }: IdIntParamDto) {
    return this.newsService.getNewsById(id);
  }

  @Post()
  @Roles(UserRole.MODERATOR)
  @ApiOperation({ summary: 'Moderator role required' })
  async createNews(@Body() dto: CreateNewsDto, @GetUser() { id: userId }: JwtUser) {
    return this.newsService.createNews(dto, userId);
  }

  @Patch(':id')
  @Roles(UserRole.MODERATOR)
  @ApiOperation({ summary: 'Moderator role required' })
  async updateNews(@Param() { id }: IdIntParamDto, @Body() dto: UpdateNewsDto) {
    return this.newsService.updateNews(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.MODERATOR)
  @ApiOperation({ summary: 'Moderator role required' })
  @HttpCode(204)
  async deleteNews(@Param() { id }: IdIntParamDto) {
    return this.newsService.deleteNews(id);
  }
}
