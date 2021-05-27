const uuid = require('uuid');

/**
 * Class representing a Board.
 */
class Board {
  /**
   * Creates an instance of Board.
   * @param {string} id board ID
   * @param {string} title board title
   * @param {array} columns board columns
   * @memberof Board
   */
  constructor({ title = 'default title', columns = [] }) {
    this.id = uuid.v4();
    this.title = title;
    this.columns = columns;
  }

  /**
   * Convert a board instance to the response representation.
   * @static
   * @param {Board} board instance
   * @return {object} response board
   * @memberof Board
   */
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
