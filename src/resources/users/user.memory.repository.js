const User = require('./user.model');
const taskService = require('../tasks/task.service');

const users = [];

/**
 * Get all users.
 * @returns {Promise<User[]>} all users
 */
const getAll = async () => users;

/**
 * Get user by id.
 * @param {string} id User id
 * @returns {Promise<User>} return User by id
 */
const getUserById = async (id) => users.find((user) => user.id === id);

/**
 * Create user.
 * @param {object} user user data
 * @return {Promise<User>} new user
 */
const createUser = async (user) => {
  const newUser = new User({
    name: user.name,
    login: user.login,
    password: user.password,
  });
  users.push(newUser);
  return newUser;
};

/**
 * Update user.
 * @param {string} id user id
 * @param {object} data user data
 * @return {Promise<User>} user with changed values for user, null if doesn't exist
 */
const updateUser = async (id, data) => {
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) {
    return null;
  }
  users[index].name = data.name ? data.name : users[index].name;
  users[index].password = data.password ? data.password : users[index].password;
  return users[index];
};

/**
 * Delete user.
 * @param {string} id user id
 * @returns {Promise<boolean>} whether the user was deleted
 */
const deleteUser = async (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) {
    return false;
  }
  users.splice(index, 1);
  await taskService.deleteUserFromTasks(id);
  return true;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
