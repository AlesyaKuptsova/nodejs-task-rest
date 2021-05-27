const tasksRepo = require('./task.memory.repositoty');

/**
 * Get all tasks.
 * @returns {Task[]} all tasks
 */
const getAll = () => tasksRepo.getAll();

/**
 * Get tasks by board ID.
 * @param {string} boardId board ID
 * @returns {Promise<Task[]>} an array with tasks belonging to the specified board ID
 */
const getTasksByBoardId = (boardId) => tasksRepo.getTasksByBoardId(boardId);

/**
 * Get a specified tasks for a specified board.
 * @param {string} boardId board ID
 * @param {string} taskId task ID
 * @returns {Promise<Task>} tasks by board task IDs
 */
const getTasksByBoardTaskIds = (boardId, taskId) =>
  tasksRepo.getTasksByBoardTaskIds(boardId, taskId);

/**
 * Create task.
 * @param {string} boardId board ID
 * @param {object} task task data
 * @returns {Promise<Task>} create new task
 */
const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);

/**
 * Delete tasks by board ID.
 * @param {string} boardId board ID
 */
const deleteTasksByBoardId = (boardId) =>
  tasksRepo.deleteTasksByBoardId(boardId);


/**
 * Update task.
 * @param {string} boardId board ID
 * @param {string} taskId task ID
 * @param {object} data task data
 * @returns {Promise<Task>} changed task, null if doesn't exist
 */
const updateTask = (boardId, taskId, data) =>
  tasksRepo.updateTask(boardId, taskId, data);

/**
 * Delete task.
 * @param {string} taskId task ID
 * @returns {Promise<boolean>} whether the user was deleted
 */
const deleteTask = (taskId) => tasksRepo.deleteTask(taskId);

/**
 * Delete user from tasks.
 * @param {string} userId user ID
 */
const deleteUserFromTasks = (userId) => tasksRepo.deleteUserFromTasks(userId);

module.exports = {
  getTasksByBoardId,
  getAll,
  getTasksByBoardTaskIds,
  createTask,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks,
};
