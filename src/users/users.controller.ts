import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GOTO pagination, filtering, and sorting
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  @ApiBadRequestResponse({
    description: '\n- Email already in use\n- Phone already in use',
  })
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
