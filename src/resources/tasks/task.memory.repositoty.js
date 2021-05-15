const Task = require('./task.model');

let tasks = [];

const getAll = () => tasks;

const getTasksByBoardId = async (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

const getTasksByBoardTaskIds = async (boardId, taskId) =>
  tasks.find((task) => task.id === taskId);

const createTask = async (boardId, task) => {
  const newTask = new Task(task);
  newTask.boardId = boardId;
  tasks.push(newTask);
  return newTask;
};

const deleteTasksByBoardId = async (boardId) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

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

const deleteTask = async (taskId) => {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index < 0) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
};

const deleteUserFromTasks = async (userId) => {
  for(let i = 0; i < tasks.length; i += 1) {
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
