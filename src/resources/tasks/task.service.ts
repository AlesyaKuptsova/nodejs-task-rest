import Task from './task.model';

import tasksRepo from './task.memory.repositoty';

import { Maybe } from '../../common/util';

/**
 * Get all tasks.
 * @returns {Task[]} all tasks
 */
const getAll = (): Promise<Task[]> => tasksRepo.getAll();

/**
 * Get tasks by board ID.
 * @param {string} boardId board ID
 * @returns {Promise<Task[]>} an array with tasks belonging to the specified board ID
 */
const getTasksByBoardId = (boardId: string): Promise<Task[]> =>
  tasksRepo.getTasksByBoardId(boardId);

/**
 * Get a specified tasks for a specified board.
 * @param {string} boardId board ID
 * @param {string} taskId task ID
 * @returns {Promise<Task>} tasks by board task IDs
 */
const getTasksByBoardTaskIds = (
  boardId: string,
  taskId: string
): Promise<Maybe<Task>> => tasksRepo.getTasksByBoardTaskIds(boardId, taskId);

type TaskCreateData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
};

/**
 * Create task.
 * @param {string} boardId board ID
 * @param {object} task task data
 * @returns {Promise<Task>} create new task
 */
const createTask = (boardId: string, task: TaskCreateData): Promise<Task> =>
  tasksRepo.createTask(boardId, task);

/**
 * Delete tasks by board ID.
 * @param {string} boardId board ID
 */
const deleteTasksByBoardId = (boardId: string): Promise<void> =>
  tasksRepo.deleteTasksByBoardId(boardId);

type TaskUpdateData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
};

/**
 * Update task.
 * @param {string} boardId board ID
 * @param {string} taskId task ID
 * @param {object} data task data
 * @returns {Promise<Task>} changed task, null if doesn't exist
 */
const updateTask = (
  boardId: string,
  taskId: string,
  data: TaskUpdateData
): Promise<Maybe<Task>> => tasksRepo.updateTask(boardId, taskId, data);

/**
 * Delete task.
 * @param {string} taskId task ID
 * @returns {Promise<boolean>} whether the user was deleted
 */
const deleteTask = (taskId: string): Promise<boolean> =>
  tasksRepo.deleteTask(taskId);

/**
 * Delete user from tasks.
 * @param {string} userId user ID
 */
const deleteUserFromTasks = (userId: string): Promise<void> =>
  tasksRepo.deleteUserFromTasks(userId);

export default {
  getTasksByBoardId,
  getAll,
  getTasksByBoardTaskIds,
  createTask,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks,
};
