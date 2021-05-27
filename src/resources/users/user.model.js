const uuid = require('uuid');

/**
 * Class representing a User.
 */
class User {
  /**
   * Creates an instance of User.
   * @param {string} id user ID
   * @param {string} name user name
   * @param {string} login user login
   * @param {string} password user password
   * @memberof User
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Convert a user instance to the response representation.
   * @static
   * @param {User} user instance
   * @return {object} response user
   * @memberof User
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
