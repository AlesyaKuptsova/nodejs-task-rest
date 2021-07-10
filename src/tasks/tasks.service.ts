import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TaskDto from './dto/task.dto';
import { Task as DBTask } from '../entity/task';
import { Maybe } from '../common/util';
import { CreateTaskDto } from './dto/create-task.dto';

function toModel(task: DBTask): TaskDto {
  return new TaskDto({
    id: task.id,
    title: task.title,
    order: task.order,
    description: task.description,
    userId: task.userId,
    boardId: task.boardId,
    columnId: task.columnId,
  });
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(DBTask)
    private tasksRepository: Repository<DBTask>
  ) {}

  async getAll(): Promise<TaskDto[]> {
    const tasks = await DBTask.find();
    return tasks.map(toModel);
  }

  async getTasksByBoardId(boardId: string): Promise<TaskDto[]> {
    const tasks = await DBTask.find({ boardId });
    return tasks.map(toModel);
  }

  async getTasksByBoardTaskIds(
    boardId: string,
    taskId: string
  ): Promise<Maybe<TaskDto>> {
    const task = await DBTask.findOne({
      id: taskId,
      boardId,
    });
    if (!task) {
      return undefined;
    }
    return toModel(task);
  }

  async createTask(boardId: string, task: CreateTaskDto): Promise<TaskDto> {
    const newTask = new DBTask();
    newTask.title = task.title;
    newTask.order = task.order;
    newTask.description = task.description;
    newTask.userId = task.userId;
    newTask.columnId = task.columnId;
    newTask.boardId = boardId;
    await newTask.save();
    return toModel(newTask);
  }

  async deleteTasksByBoardId(boardId: string): Promise<void> {
    await this.tasksRepository.delete({ boardId });
  }

  async updateTask(
    boardId: string,
    taskId: string,
    data: CreateTaskDto
  ): Promise<Maybe<TaskDto>> {
    const task = await DBTask.findOne({ boardId, id: taskId });
    if (!task) {
      return undefined;
    }
    task.title = data.title ? data.title : task.title;
    task.order = data.order ? data.order : task.order;
    task.description = data.description ? data.description : task.description;
    task.userId = data.userId ? data.userId : task.userId;
    task.columnId = data.columnId ? data.columnId : task.columnId;

    await task.save();
    return toModel(task);
  }

  async deleteTask(boardId: string, taskId: string): Promise<boolean> {
    const task = await DBTask.findOne({ id: taskId, boardId });
    if (!task) {
      return false;
    }
    await task.remove();
    return true;
  }

  async deleteUserFromTasks(userId: string): Promise<void> {
    const tasks = await this.tasksRepository.find({ userId });
    for (let i = 0; i < tasks.length; i += 1) {
      const task = tasks[i];
      if (!task) {
        return;
      }
      task.userId = null;
    }
    await this.tasksRepository.save(tasks);
  }
}
