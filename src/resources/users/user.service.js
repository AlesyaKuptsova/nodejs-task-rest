const usersRepo = require('./user.memory.repository');

/**
 * Get all users.
 * @returns {Promise<User[]>} all users
 */
const getAll = () => usersRepo.getAll();

/**
 * Get user by id.
 * @param {string} id user id
 * @returns {Promise<User>} return User by id
 */
const getUserById = (id) => usersRepo.getUserById(id);

/**
 * Create user.
 * @param {object} user user data
 * @returns {Promise<User>} new user
 */
const createUser = (user) => usersRepo.createUser(user);

/**
 * Update user.
 * @param {string} id user id to be updated
 * @param {object} data updated data
 * @returns {Promise<User>} user with changed values, null if doesn't exist
 */
const updateUser = (id, data) => usersRepo.updateUser(id, data);

/**
 * Delete user.
 * @param {string} id user id to be deleted
 * @returns {Promise<boolean>} whether the user was deleted
 */
const deleteUser = async (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
