import Task from './task.model';

import { Maybe } from '../../common/util';

let tasks: Array<Task> = [];

/**
 * Get all tasks.
 * @returns {Task[]} array containing all tasks
 */
const getAll = async (): Promise<Task[]> => tasks;

/**
 * Get tasks by board ID.
 * @param {string} boardId task board ID
 * @returns {Promise<Task[]>} an array with tasks belonging to the specified board ID
 */
const getTasksByBoardId = async (boardId: string): Promise<Task[]> =>
  tasks.filter((task) => task.boardId === boardId);

/**
 * Get a specified tasks for a specified board.
 * @param {string} boardId board ID
 * @param {string} taskId task ID
 * @returns {Promise<Task>} tasks by board task IDs
 */
const getTasksByBoardTaskIds = async (
  boardId: string,
  taskId: string
): Promise<Maybe<Task>> => {
  const task = tasks.find((t) => t.id === taskId);
  if (task && task.boardId === boardId) {
    return task;
  }
  return undefined;
};

type TaskCreateData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
};

/**
 * Create task.
 * @param {string} boardId task board ID
 * @param {object} task task ID
 * @return {Promise<Task>} create new Task
 */
const createTask = async (
  boardId: string,
  task: TaskCreateData
): Promise<Task> => {
  const newTask = new Task(task);
  newTask.boardId = boardId;
  tasks.push(newTask);
  return newTask;
};

/**
 * Delete tasks by board ID.
 * @param {string} boardId task board ID
 */
const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

type TaskUpdateData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
};
/**
 * Update task.
 * @param {string} taskId task ID
 * @param {object} data task data
 * @return {Promise<Task>} changed task, null if doesn't exist
 */
const updateTask = async (
  boardId: string,
  taskId: string,
  data: TaskUpdateData
): Promise<Maybe<Task>> => {
  const task = tasks.find((t) => t.id === taskId);
  if (!task || task.boardId !== boardId) {
    return undefined;
  }
  task.title = data.title;
  task.order = data.order;
  task.description = data.description;
  task.userId = data.userId;
  task.columnId = data.columnId;
  return task;
};

/**
 * Delete task.
 * @param {string} taskId task ID
 * @returns {Promise<boolean>} whether the task was deleted
 */
const deleteTask = async (taskId: string): Promise<boolean> => {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index < 0) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
};

/**
 * Delete user from tasks.
 * @param {string} userId task user ID
 */
const deleteUserFromTasks = async (userId: string): Promise<void> => {
  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    if (task) {
      if (task.userId === userId) {
        task.userId = null;
      }
    }
  }
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
