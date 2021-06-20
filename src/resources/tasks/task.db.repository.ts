import { getRepository } from 'typeorm';
import Task from './task.model';
import { Task as DBTask } from '../../entity/task';

import { Maybe } from '../../common/util';

function toModel(task: DBTask): Task {
  return new Task({
    id: task.id,
    title: task.title,
    order: task.order,
    description: task.description,
    userId: task.userId,
    boardId: task.boardId,
    columnId: task.columnId,
  });
}

const getAll = async (): Promise<Task[]> => {
  const tasks = await DBTask.find();
  return tasks.map(toModel);
};

const getTasksByBoardId = async (boardId: string): Promise<Task[]> => {
  const tasks = await DBTask.find({ boardId });
  return tasks.map(toModel);
};

const getTasksByBoardTaskIds = async (
  boardId: string,
  taskId: string
): Promise<Maybe<Task>> => {
  const task = await DBTask.findOne({
    id: taskId,
    boardId,
  });
  if (!task) {
    return undefined;
  }
  return toModel(task);
};

type TaskCreateData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
};

const createTask = async (
  boardId: string,
  task: TaskCreateData
): Promise<Task> => {
  const newTask = new DBTask();
  newTask.title = task.title;
  newTask.order = task.order;
  newTask.description = task.description;
  newTask.userId = task.userId;
  newTask.columnId = task.columnId;
  newTask.boardId = boardId;
  await newTask.save();
  return toModel(newTask);
};

const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  const repository = getRepository(DBTask);
  await repository.delete({ boardId });
};

type TaskUpdateData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
};

const updateTask = async (
  boardId: string,
  taskId: string,
  data: TaskUpdateData
): Promise<Maybe<Task>> => {
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
};

const deleteTask = async (taskId: string): Promise<boolean> => {
  const task = await DBTask.findOne({ id: taskId });
  if (!task) {
    return false;
  }
  await task.remove();
  return true;
};

const deleteUserFromTasks = async (userId: string): Promise<void> => {
    const repository = getRepository(DBTask);
   const tasks = await repository.find({userId});
   for (let i = 0; i < tasks.length; i += 1) {
       const task = tasks[i];
       if(!task) {
           return;
       }
       task.userId = null;
   }
   await repository.save(tasks);
};

export default {
  getAll,
  getTasksByBoardId,
  getTasksByBoardTaskIds,
  createTask,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks,
};
