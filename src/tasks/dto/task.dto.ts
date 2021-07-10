import * as uuid from 'uuid';

export default class TaskDto {

  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string | null;

  constructor({
    id = uuid.v4(),
    title = 'title',
    order = 1,
    description = 'description',
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId',
  }: {id?: string, title?: string,
    order?: number, description?: string, userId?: string | null, boardId?: string, columnId?: string| null} = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(
    task: TaskDto
  ): {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string | null;
  } {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
