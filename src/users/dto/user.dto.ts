import * as uuid from 'uuid';

export  class UserDto {
  id: string;

  name: string;

  login: string;

  passwordHash: string;

  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    passwordHash = '',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.passwordHash = passwordHash;
  }

  static toResponse(user: UserDto): { id: string; name: string; login: string } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
