const Board = require('./board.model');
const taskService = require('../tasks/task.service');

const boards = [];

const getAll = async () => boards;

const getBoardById = async (id) => boards.find((board) => board.id === id);

const createBoard = async (data) => {
  const newBoard = new Board({
    title: data.title,
    columns: data.columns,
  });
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, data) => {
  const index = boards.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  boards[index].title = data.title ? data.title : boards[index].title;
  boards[index].columns = data.columns ? data.columns : boards[index].columns;
  return boards[index];
};

const deleteBoard = async (id) => {
  const index = boards.findIndex((board) => board.id === id);
  if (index < 0) {
    return false;
  }
  await taskService.deleteTasksByBoardId(id);
  boards.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
