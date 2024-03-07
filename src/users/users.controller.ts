import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/database/entities/user';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GOTO pagination, filtering, and sorting
  @Get()
  @ApiOperation({ summary: 'Admin role required' })
  @Roles(UserRole.ADMIN)
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Admin role required' })
  @Roles(UserRole.ADMIN)
  @ApiBadRequestResponse({
    description: '\n- Email already in use\n- Phone already in use',
  })
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
