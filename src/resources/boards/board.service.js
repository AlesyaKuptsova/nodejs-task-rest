const boardsRepo = require('./board.memory.repository');
const { deleteTasksByBoardId } = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const createBoard = (data) => boardsRepo.createBoard(data);
const getBoardById = (id) => boardsRepo.getBoardById(id);
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);
const deleteBoard = async (id) => {
  await deleteTasksByBoardId(id);
  return boardsRepo.deleteBoard(id);
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
};
