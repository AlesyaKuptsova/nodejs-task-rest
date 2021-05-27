const boardsRepo = require('./board.memory.repository');
const { deleteTasksByBoardId } = require('../tasks/task.service');

/**
 * Get all boards.
 * @returns {Promise<Board[]>} array containing all boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Create board.
 * @param {object} data board data
 * @returns {Promise<Board>} new board
 */
const createBoard = (data) => boardsRepo.createBoard(data);

/**
 * Get the board by ID.
 * @param {string} id board ID
 * @returns {Promise<Board>} board by ID
 */
const getBoardById = (id) => boardsRepo.getBoardById(id);

/**
 * Update board.
 * @param {string} id board ID
 * @param {object} data board data
 * @returns {Promise<Board>} changed board, null if doesn't exist
 */
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);

/**
 * Delete board.
 * @param {string} id board ID
 * @return {Promise<boolean>} whether the board was deleted
 */
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
