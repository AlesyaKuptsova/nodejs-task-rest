import * as uuid from 'uuid';

/**
 * Class representing a Column.
 */
export class Column {
  /**
   * @type {string} title
   * @memberof Column
   */
  title: string;

  /**
   * @type {number} order
   * @memberof Column
   */
  order: number;

  /**
   * Creates an instance of Column.
   * @memberof Column
   */
  constructor({ title = 'title', order = 1 } = {}) {
    this.title = title;
    this.order = order;
  }
}

type ResponseColumn = { title: string; order: number };

/**
 * Class representing a Board.
 */
export class Board {
  id: string;

  title: string;

  columns: Array<Column>;

  /**
   * Creates an instance of Board.
   * @param {string} id board ID
   * @param {string} title board title
   * @param {array} columns board columns
   * @memberof Board
   */
  constructor({
    id = uuid.v4(),
    title = 'default title',
    columns = [],
  }: {
    id: string;
    title: string;
    columns: Array<Column>;
  }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Convert a board instance to the response representation.
   * @static
   * @param {Board} board instance
   * @return {Array<ResponseColumn>} response board
   * @memberof Board
   */
  static toResponse(
    board: Board
  ): { id: string; title: string; columns: Array<ResponseColumn> } {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
