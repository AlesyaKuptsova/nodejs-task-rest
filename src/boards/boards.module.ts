import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
    controllers: [BoardsController],
    providers: [BoardsService],
    imports: [TasksModule, AuthModule],
})
export class BoardsModule {}
