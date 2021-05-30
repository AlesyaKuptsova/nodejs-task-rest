import User from './user.model';

import { Maybe } from '../../common/util';

import taskService from '../tasks/task.service';

const users: Array<User> = [];

/**
 * Get all users.
 * @returns {Promise<User[]>} all users
 */
const getAll = async (): Promise<User[]> => users;

/**
 * Get user by id.
 * @param {string} id User id
 * @returns {Promise<User>} return User by id
 */
const getUserById = async (id: string): Promise<Maybe<User>> =>
  users.find((user) => user.id === id);

type UserCreateData = {
  name: string;
  login: string;
  password: string;
};

/**
 * Create user.
 * @param {object} user user data
 * @return {Promise<User>} new user
 */
const createUser = async (user: UserCreateData): Promise<User> => {
  const newUser = new User({
    name: user.name,
    login: user.login,
    password: user.password,
  });
  users.push(newUser);
  return newUser;
};

type UserUpdateData = {
  name: Maybe<string>;
  password: Maybe<string>;
};

/**
 * Update user.
 * @param {string} id user id
 * @param {UserData} data user data
 * @return {Promise<User>} user with changed values for user, null if doesn't exist
 */
const updateUser = async (
  id: string,
  data: UserUpdateData
): Promise<Maybe<User>> => {
  const user = users.find((u) => u.id === id);
  if (!user) {
    return undefined;
  }
  user.name = data.name ? data.name : user.name;
  user.password = data.password ? data.password : user.password;
  return user;
};

/**
 * Delete user.
 * @param {string} id user id
 * @returns {Promise<boolean>} whether the user was deleted
 */
const deleteUser = async (id: string): Promise<boolean> => {
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) {
    return false;
  }
  users.splice(index, 1);
  await taskService.deleteUserFromTasks(id);
  return true;
};

export default { getAll, getUserById, createUser, updateUser, deleteUser };
