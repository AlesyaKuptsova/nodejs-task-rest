import { Board, Column } from './board.model';

import { Maybe } from '../../common/util';

import taskService from '../tasks/task.service';

const boards: Array<Board> = [];

/**
 * Get all boards.
 * @returns {Promise<Board[]>} array containing all boards
 */
const getAll = async (): Promise<Board[]> => boards;

/**
 * Get the board by ID.
 * @param {string} id board ID
 * @returns {Promise<Board>} board by ID
 */
const getBoardById = async (id: string): Promise<Maybe<Board>> =>
  boards.find((board) => board.id === id);

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
 * @return {Promise<Board>} new board
 */
const createBoard = async (data: BoardCreateData): Promise<Board> => {
  const newBoard = new Board({
    title: data.title,
    columns: data.columns.map((c) => new Column(c)),
  });
  boards.push(newBoard);
  return newBoard;
};

type BoardUpdateData = {
  title: string;
  columns: Array<ColumnCreateData>;
};
/**
 * Update board.
 * @param {string} id board ID
 * @param {object} data board data
 * @return {Promise<Board>} changed board, null if doesn't exist
 */
const updateBoard = async (
  id: string,
  data: BoardUpdateData
): Promise<Maybe<Board>> => {
  const board = boards.find((b) => b.id === id);
  if (!board) {
    return undefined;
  }
  board.title = data.title ? data.title : board.title;
  board.columns = data.columns
    ? data.columns.map((c) => new Column(c))
    : board.columns;
  return board;
};

/**
 * Delete board.
 * @param {string} id board ID
 * @return {Promise<boolean>} whether the board was deleted
 */
const deleteBoard = async (id: string): Promise<boolean> => {
  const index = boards.findIndex((board) => board.id === id);
  if (index < 0) {
    return false;
  }
  await taskService.deleteTasksByBoardId(id);
  boards.splice(index, 1);
  return true;
};

export default {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
