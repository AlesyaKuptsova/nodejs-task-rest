import {
  Body,
  Delete,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

import { CreateTaskDto } from './dto/create-task.dto';
import TaskDto from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Param('boardId') boardId: string): Promise<TaskDto[]> {
    return this.tasksService.getTasksByBoardId(boardId);
  }

  @Get(':taskId')
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<TaskDto> {
    const task = await this.tasksService.getTasksByBoardTaskIds(
      boardId,
      taskId
    );
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<TaskDto> {
    return this.tasksService.createTask(boardId, createTaskDto);
  }

  @Put(':taskId')
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<TaskDto> {
    const task = await this.tasksService.updateTask(
      boardId,
      taskId,
      createTaskDto
    );
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @Delete(':taskId')
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<void> {
    const removed = await this.tasksService.deleteTask(boardId, taskId);
    if (!removed) {
      throw new NotFoundException();
    }
  }
}
