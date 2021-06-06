import usersRepo from './user.memory.repository';

import User from './user.model';

import { Maybe } from '../../common/util';

/**
 * Get all users.
 * @returns {Promise<User[]>} all users
 */
const getAll = (): Promise<User[]> => usersRepo.getAll();

/**
 * Get user by id.
 * @param {string} id user id
 * @returns {Promise<User>} return User by id
 */
const getUserById = (id: string): Promise<Maybe<User>> =>
  usersRepo.getUserById(id);

type UserCreateData = {
  name: string;
  login: string;
  password: string;
};

/**
 * Create user.
 * @param {object} user user data
 * @returns {Promise<User>} new user
 */
const createUser = (user: UserCreateData): Promise<User> =>
  usersRepo.createUser(user);

type UserUpdateData = {
  name: Maybe<string>;
  password: Maybe<string>;
};

/**
 * Update user.
 * @param {string} id user id to be updated
 * @param {object} data updated data
 * @returns {Promise<User>} user with changed values, null if doesn't exist
 */
const updateUser = (id: string, data: UserUpdateData): Promise<Maybe<User>> =>
  usersRepo.updateUser(id, data);

/**
 * Delete user.
 * @param {string} id user id to be deleted
 * @returns {Promise<boolean>} whether the user was deleted
 */
const deleteUser = async (id: string): Promise<boolean> =>
  usersRepo.deleteUser(id);

export default { getAll, getUserById, createUser, updateUser, deleteUser };
