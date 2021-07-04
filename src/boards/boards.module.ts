import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
    controllers: [BoardsController],
    providers: [BoardsService],
    imports: [TasksModule],
})
export class BoardsModule {}
