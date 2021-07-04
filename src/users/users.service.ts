import bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { Maybe } from '../common/util';

import { config } from '../common/config';
import {UserDto} from './dto/user.dto';
import { User as DBUser } from '../entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { TasksService } from '../tasks/tasks.service';


const saltRounds = 10;

function toModel(user: DBUser): UserDto {
  return new UserDto({
    id: user.id,
    name: user.name,
    login: user.login,
    passwordHash: user.passwordHash,
  });
}

@Injectable()
export class UsersService {
  constructor(private tasksService: TasksService) {
    this.addAdmin();
  }

  async getAll(): Promise<UserDto[]> {
    const users = await DBUser.find();
    return users.map(toModel);
  }

  async getUserById(id: string): Promise<Maybe<UserDto>> {
    const user = await DBUser.findOne({ id });
    if (!user) {
      return undefined;
    }
    return toModel(user);
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    const newUser = new DBUser();
    newUser.name = user.name;
    newUser.login = user.login;
    newUser.passwordHash = bcrypt.hashSync(user.password, saltRounds);
    await newUser.save();
    return toModel(newUser);
  }

  async updateUser(id: string, data: CreateUserDto): Promise<Maybe<UserDto>> {
    const user = await DBUser.findOne({ id });
    if (!user) {
      return undefined;
    }
    user.name = data.name ? data.name : user.name;
    user.passwordHash = data.password
      ? bcrypt.hashSync(data.password, saltRounds)
      : user.passwordHash;
    await user.save();
    return toModel(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await DBUser.findOne({ id });
    if (!user) {
      return false;
    }
    await user.remove();
    await this.tasksService.deleteUserFromTasks(id);
    return true;
  }

  private async addAdmin() {
    const adminPassword = config.ADMIN_PASSWORD;
    if(adminPassword) {
      await this.createUser({
        name: 'admin',
        login: 'admin',
        password: adminPassword,
      });
    }
  }
}