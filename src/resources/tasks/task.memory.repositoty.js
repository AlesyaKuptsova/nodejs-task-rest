const Task = require('./task.model');

let tasks = [];

const getAll = () => tasks;

const getTasksByBoardId = async boardId => tasks.filter(task => task.boardId === boardId);

const getTasksByBoardTaskIds = async (boardId, taskId) =>
  tasks.find(task => task.id === taskId);

const createTask = async (boardId, task) => {
  const newTask = new Task(task);
  newTask.boardId = boardId;
  tasks.push(newTask);
  return newTask;
};

const deleteTasksByBoardId = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

const updateTask = async (boardId, taskId, data) => {
  const index = tasks.findIndex(task => task.id === taskId);
  if (index < 0) {
    return null;
  }
  const task = new Task(data);
  task.id = taskId;
  tasks[index] = task;
  return task;
};

const deleteTask = async taskId => {
  const index = tasks.findIndex(task => task.id === taskId);
  if (index < 0) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
};

const deleteUserFromTasks = async userId => {
  tasks = tasks.map(task => {
    if (task.userId === userId) {
      tasks.userId = null;
    }
    return task;
  });
};

module.exports = {
  getTasksByBoardId,
  createTask,
  getAll,
  getTasksByBoardTaskIds,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks
};