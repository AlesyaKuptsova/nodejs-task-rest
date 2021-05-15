const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUserById = (id) => usersRepo.getUserById(id);

const createUser = (user) => usersRepo.createUser(user);

const updateUser = (id, data) => usersRepo.updateUser(id, data);

const deleteUser = async (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
