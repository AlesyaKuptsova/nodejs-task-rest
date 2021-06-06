import * as uuid from 'uuid';

/**
 * Class representing a User.
 */
export default class User {
  /**
   * Creates an instance of User.
   * @param {string} id user ID
   * @param {string} name user name
   * @param {string} login user login
   * @param {string} password user password
   * @memberof User
   */

  id: string;

  name: string;

  login: string;

  password: string;

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
   * @return {{id: string, name: string, login: string}} response user
   * @memberof User
   */
  static toResponse(user: User): { id: string; name: string; login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
