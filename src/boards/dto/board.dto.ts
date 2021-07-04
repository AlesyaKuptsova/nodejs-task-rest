import * as uuid from 'uuid';
import { ColumnDto } from './column.dto';

type ResponseColumn = { title: string; order: number };

export class BoardDto {
  id: string;

  title: string;

  columns: Array<ColumnDto>;

  constructor({
    id = uuid.v4(),
    title = 'default title',
    columns = [],
  }: {
    id: string;
    title: string;
    columns: Array<ColumnDto>;
  }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(
    board: BoardDto
  ): { id: string; title: string; columns: Array<ResponseColumn> } {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
