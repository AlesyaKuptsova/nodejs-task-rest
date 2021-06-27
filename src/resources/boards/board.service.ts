import boardsRepo from './board.db.repository';

import { Board } from './board.model';

import { Maybe } from '../../common/util';

import taskService from '../tasks/task.service';

/**
 * Get all boards.
 * @returns {Promise<Board[]>} array containing all boards
 */
const getAll = (): Promise<Board[]> => boardsRepo.getAll();

type ColumnCreateData = {
  title: string;
  order: number;
};

type BoardCreateData = {
  title: string;
  columns: Array<ColumnCreateData>;
};

/**
 * Create board.
 * @param {object} data board data
 * @returns {Promise<Board>} new board
 */
const createBoard = (data: BoardCreateData): Promise<Board> =>
  boardsRepo.createBoard(data);

/**
 * Get the board by ID.
 * @param {string} id board ID
 * @returns {Promise<Board>} board by ID
 */
const getBoardById = (id: string): Promise<Maybe<Board>> =>
  boardsRepo.getBoardById(id);

type BoardUpdateData = {
  title: string;
  columns: Array<ColumnCreateData>;
};

/**
 * Update board.
 * @param {string} id board ID
 * @param {object} data board data
 * @returns {Promise<Board>} changed board, null if doesn't exist
 */
const updateBoard = (
  id: string,
  data: BoardUpdateData
): Promise<Maybe<Board>> => boardsRepo.updateBoard(id, data);

/**
 * Delete board.
 * @param {string} id board ID
 * @return {Promise<boolean>} whether the board was deleted
 */
const deleteBoard = async (id: string): Promise<boolean> => {
  await taskService.deleteTasksByBoardId(id);
  return boardsRepo.deleteBoard(id);
};

export default {
  getAll,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
};
