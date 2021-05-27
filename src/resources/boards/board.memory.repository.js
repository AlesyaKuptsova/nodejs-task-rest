const Board = require('./board.model');
const taskService = require('../tasks/task.service');

const boards = [];

/**
 * Get all boards.
 * @returns {Promise<Board[]>} array containing all boards
 */
const getAll = async () => boards;

/**
 * Get the board by ID.
 * @param {string} id board ID
 * @returns {Promise<Board>} board by ID
 */
const getBoardById = async (id) => boards.find((board) => board.id === id);

/**
 * Create board.
 * @param {object} data board data
 * @return {Promise<Board>} new board
 */
const createBoard = async (data) => {
  const newBoard = new Board({
    title: data.title,
    columns: data.columns,
  });
  boards.push(newBoard);
  return newBoard;
};

/**
 * Update board.
 * @param {string} id board ID
 * @param {object} data board data
 * @return {Promise<Board>} changed board, null if doesn't exist
 */
const updateBoard = async (id, data) => {
  const index = boards.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  boards[index].title = data.title ? data.title : boards[index].title;
  boards[index].columns = data.columns ? data.columns : boards[index].columns;
  return boards[index];
};

/**
 * Delete board.
 * @param {string} id board ID
 * @return {Promise<boolean>} whether the board was deleted
 */
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
