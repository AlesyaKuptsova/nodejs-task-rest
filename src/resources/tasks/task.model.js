const uuid = require('uuid');

/**
 * Class representing a Task.
 */
class Task {
  /**
   * Creates an instance of Task.
   * @param {string} id task ID
   * @param {string} title task title
   * @param {number} order task order
   * @param {string} description task description
   * @param {string} userId task user ID
   * @param {string} boardId task board ID
   * @param {stirng} columnId task column ID
   * @memberof Task
   */
  constructor({ title, order, description, userId, boardId, columnId }) {
    this.id = uuid.v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Convert a task instance to the response representation.
   * @static
   * @param {Task} task instance
   * @return {object} response task
   * @memberof Task
   */
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
