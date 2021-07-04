import {  Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [TasksModule, AuthModule],
})
export class UsersModule {}
