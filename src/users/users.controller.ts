import {
  Delete,
  Param,
  Post,
  Put,
  NotFoundException,
  Body,
  Controller,
  Get,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  private readonly logger = new Logger(UsersController.name);

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.getUserById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto
  ): Promise<UserDto> {
    const user = await this.usersService.updateUser(id, createUserDto);
    if (user) {
      this.logger.log(`user created: ${user.id} ${user.login}`);
      return user;
    }
    throw new NotFoundException();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const removed = await this.usersService.deleteUser(id);
    if (!removed) {
      throw new NotFoundException();
    }
    this.logger.log(`user removed: ${id}`);
  }
}
