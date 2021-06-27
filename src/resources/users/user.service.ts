import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import usersRepo from './user.db.repository';

import User from './user.model';

import { Maybe } from '../../common/util';

import { config } from '../../common/config';

const saltRounds = 10;

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
const createUser = (user: UserCreateData): Promise<User> => {
  const newUser = { ...user };
  newUser.password = bcrypt.hashSync(user.password, saltRounds);
  return usersRepo.createUser(newUser);
};

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
const updateUser = (id: string, data: UserUpdateData): Promise<Maybe<User>> => {
  const newData = { ...data };
  if (data.password) {
    newData.password = bcrypt.hashSync(data.password, saltRounds);
  }
  return usersRepo.updateUser(id, newData);
};

/**
 * Delete user.
 * @param {string} id user id to be deleted
 * @returns {Promise<boolean>} whether the user was deleted
 */
const deleteUser = async (id: string): Promise<boolean> =>
  usersRepo.deleteUser(id);

const signToken = async (
  login: string,
  password: string
): Promise<Maybe<string>> => {
  if (!login || !password) {
    return undefined;
  }
  const user = await usersRepo.findUserWithHash(login);
  if (user) {
    if (bcrypt.compareSync(password, user.passwordHash)) {
      const payload = { sub: user.id, login };
      const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
        expiresIn: 10000,
      });
      return token;
    }
  }
  return undefined;
};

export default {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  signToken,
};
