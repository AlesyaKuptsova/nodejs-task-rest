import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [TasksModule],
})
export class UsersModule {}
