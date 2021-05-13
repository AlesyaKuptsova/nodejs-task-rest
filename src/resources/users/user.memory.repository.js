const User = require('./user.model');

const users = [];
const getAll = async () => users;
const getUserById = async id => users.find(user => user.id === id);

const createUser = async user => {
    const newUser = new User({
      id: null,
      name: user.name,
      login: user.login,
      password: user.password
    });
    users.push(newUser);
    return newUser;
  }


module.exports = { getAll, getUserById, createUser };
