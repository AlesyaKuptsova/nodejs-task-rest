import { Board, Column } from './board.model';

import { Board as DBBoard } from '../../entity/board';
import { BoardColumn as DBBoardColumn } from '../../entity/column';

import { Maybe } from '../../common/util';

import taskService from '../tasks/task.service';

function toColumn(column: DBBoardColumn): Column {
  return new Column({
    title: column.title,
    order: column.order
  });
}

function toModel(board: DBBoard): Board {
  return new Board({
    id: board.id,
    title: board.title,
    columns: board.columns ? board.columns.sort((a, b) => a.index - b.index).map(toColumn) : [],
  });
}

function prepareColumns(columns: Column[]) {
  let i = 0;
  return columns.map(column => {
    const dbColumn = new DBBoardColumn();
    dbColumn.title = column.title;
    dbColumn.order = column.order;
    dbColumn.index = i;
    i += 1;
    return dbColumn;
  });
}

const getAll = async (): Promise<Board[]> => {
  const boards = await DBBoard.find({ relations: ["columns"] });
  return boards.map(toModel);
};

const getBoardById = async (id: string): Promise<Maybe<Board>> => {
  const board = await DBBoard.findOne({ id }, { relations: ["columns"] });
  if (!board) {
    return undefined;
  }
  return toModel(board);
};

type ColumnCreateData = {
  title: string;
  order: number;
};

type BoardCreateData = {
  title: string;
  columns: Array<ColumnCreateData>;
};

const createBoard = async (data: BoardCreateData): Promise<Board> => {
  const newBoard = new DBBoard();
  newBoard.title = data.title;
  newBoard.columns = prepareColumns(data.columns);
  await newBoard.save();
  return toModel(newBoard);
};

type BoardUpdateData = {
  title: string;
  columns: Array<ColumnCreateData>;
};

const updateBoard = async (
  id: string,
  data: BoardUpdateData
): Promise<Maybe<Board>> => {
  const board = await DBBoard.findOne({ id }, { relations: ["columns"] });
  if (!board) {
    return undefined;
  }
  board.title = data.title ? data.title : board.title;
  if(data.columns) {
    board.columns = prepareColumns(data.columns);
  }
  await board.save();
  return toModel(board);
};

const deleteBoard = async (id: string): Promise<boolean> => {
  const board = await DBBoard.findOne({ id });
  if (!board) {
    return false;
  }
  await board.remove();
  await taskService.deleteTasksByBoardId(id);
  return true;
};

export default {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
