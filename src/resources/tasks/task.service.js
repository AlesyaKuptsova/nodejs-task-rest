const tasksRepo = require('./task.memory.repositoty');

const getTasksByBoardId = boardId => tasksRepo.getTasksByBoardId(boardId);
const getAll = () => tasksRepo.getAll();
const getTasksByBoardTaskIds = (boardId, taskId) =>
  tasksRepo.getTasksByBoardTaskIds(boardId, taskId);

const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);

const deleteTasksByBoardId = boardId => tasksRepo.deleteTasksByBoardId(boardId);
const updateTask = (boardId, taskId, data) =>
  tasksRepo.updateTask(boardId, taskId, data);
const deleteTask = taskId => tasksRepo.deleteTask(taskId);
const deleteUserFromTasks = userId => tasksRepo.deleteUserFromTasks(userId);

module.exports = {
  getTasksByBoardId,
  getAll,
  getTasksByBoardTaskIds,
  createTask,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks
};