import { Injectable } from '@nestjs/common';
import { Maybe } from '../common/util';

import { Board as DBBoard } from '../entity/board';
import { BoardColumn as DBBoardColumn } from '../entity/column';
import { TasksService } from '../tasks/tasks.service';
import { BoardDto } from './dto/board.dto';
import { ColumnDto } from './dto/column.dto';
import { CreateBoardDto } from './dto/create-board.dto';

function prepareColumns(columns: ColumnDto[]) {
  let i = 0;
  return columns.map((column) => {
    const dbColumn = new DBBoardColumn();
    dbColumn.title = column.title;
    dbColumn.order = column.order;
    dbColumn.index = i;
    i += 1;
    return dbColumn;
  });
}

function toColumn(column: DBBoardColumn): ColumnDto {
  return new ColumnDto({
    title: column.title,
    order: column.order,
  });
}

function toModel(board: DBBoard): BoardDto {
  return new BoardDto({
    id: board.id,
    title: board.title,
    columns: board.columns
      ? board.columns.sort((a, b) => a.index - b.index).map(toColumn)
      : [],
  });
}

@Injectable()
export class BoardsService {
  constructor(private tasksService: TasksService) {}

  async getAll(): Promise<BoardDto[]> {
    const boards = await DBBoard.find({ relations: ['columns'] });
    return boards.map(toModel);
  }

  async createBoard(data: CreateBoardDto): Promise<BoardDto> {
    const newBoard = new DBBoard();
    newBoard.title = data.title;
    newBoard.columns = prepareColumns(data.columns);
    await newBoard.save();
    return toModel(newBoard);
  }

  async getBoardById(id: string): Promise<Maybe<BoardDto>> {
    const board = await DBBoard.findOne({ id }, { relations: ['columns'] });
    if (!board) {
      return undefined;
    }
    return toModel(board);
  }

  async updateBoard(
    id: string,
    data: CreateBoardDto
  ): Promise<Maybe<BoardDto>> {
    const board = await DBBoard.findOne({ id }, { relations: ['columns'] });
    if (!board) {
      return undefined;
    }
    board.title = data.title ? data.title : board.title;
    if (data.columns) {
      board.columns = prepareColumns(data.columns);
    }
    await board.save();
    return toModel(board);
  }

  async deleteBoard(id: string): Promise<boolean> {
    const board = await DBBoard.findOne({ id });
    if (!board) {
      return false;
    }
    await board.remove();
    await this.tasksService.deleteTasksByBoardId(id);
    return true;
  }
}
