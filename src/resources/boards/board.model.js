const uuid = require('uuid');

class Board {
  constructor({ title = 'default title', columns = [] }) {
    this.id = uuid.v4();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
