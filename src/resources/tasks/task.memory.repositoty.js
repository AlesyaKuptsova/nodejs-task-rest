const Task = require('./task.model');

let tasks = [];

/**
 * Get all tasks.
 * @returns {Task[]} array containing all tasks
 */
const getAll = () => tasks;

/**
 * Get tasks by board ID.
 * @param {string} boardId task board ID
 * @returns {Promise<Task[]>} an array with tasks belonging to the specified board ID
 */
const getTasksByBoardId = async (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

/**
 * Get a specified tasks for a specified board.
 * @param {string} boardId task board ID
 * @param {string} taskId task ID
 * @returns {Promise<Task>} tasks by board task IDs
 */
const getTasksByBoardTaskIds = async (boardId, taskId) =>
  tasks.find((task) => task.id === taskId);

/**
 * Create task.
 * @param {string} boardId task board ID
 * @param {string} taskId task ID
 * @return {Promise<Task>} create new Task
 */
const createTask = async (boardId, task) => {
  const newTask = new Task(task);
  newTask.boardId = boardId;
  tasks.push(newTask);
  return newTask;
};

/**
 * Delete tasks by board ID.
 * @param {string} boardId task board ID
 */
const deleteTasksByBoardId = async (boardId) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

/**
 * Update task.
 * @param {string} boardId task board ID
 * @param {string} taskId task ID
 * @param {object} data task data
 * @return {Promise<Task>} changed task, null if doesn't exist
 */
const updateTask = async (boardId, taskId, data) => {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index < 0) {
    return null;
  }
  const task = new Task(data);
  task.id = taskId;
  tasks[index] = task;
  return task;
};

/**
 * Delete task.
 * @param {string} taskId task ID
 * @returns {Promise<boolean>} whether the task was deleted
 */
const deleteTask = async (taskId) => {
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
const deleteUserFromTasks = async (userId) => {
  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    if (task.userId === userId) {
      task.userId = null;
    }
  }
};

module.exports = {
  getAll,
  getTasksByBoardId,
  getTasksByBoardTaskIds,
  createTask,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks,
};
