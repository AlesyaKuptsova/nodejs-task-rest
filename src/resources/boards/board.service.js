const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const createBoard = data => boardsRepo.createBoard(data);
const getBoardById = id => boardsRepo.getBoardById(id);
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);
const deleteBoard = async id =>
  // TODO: When somebody DELETEs Board, all its Tasks should be deleted as well.
   boardsRepo.deleteBoard(id);


module.exports = { getAll, createBoard, getBoardById, deleteBoard, updateBoard };