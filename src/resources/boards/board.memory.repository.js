const Board = require('./board.model');

const boards = [];

const getAll = async () => boards;

const getBoardById = async (id) => boards.find((board) => board.id === id);

const createBoard = async (board) => {
  const newBoard = new Board({
    title: board.title,
    columns: [],
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
  // TODO: When somebody DELETEs Board, all its Tasks should be deleted as well.
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
