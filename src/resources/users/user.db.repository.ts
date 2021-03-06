import User from './user.model';
import {User as DBUser} from '../../entity/user';

import { Maybe } from '../../common/util';

import taskService from '../tasks/task.service';

function toModel(user: DBUser): User {
  return new User({
    id: user.id,
    name: user.name,
    login: user.login,
    passwordHash: user.passwordHash,
  });
}

const getAll = async (): Promise<User[]> =>{
    const users = await DBUser.find();
    return users.map(toModel);
}

const findUserByLogin = async (login:string ): Promise<Maybe<User>> =>{
  const user = await DBUser.findOne({ login });
  if(user) {
    return toModel(user);
  }
  return undefined;
}

const getUserById = async (id: string): Promise<Maybe<User>> => {
  const user = await DBUser.findOne({id});
  if (!user) {
    return undefined;
  }
  return toModel(user);
}

type UserCreateData = {
  name: string;
  login: string;
  password: string;
};

const createUser = async (user: UserCreateData): Promise<User> => {
  const newUser = new DBUser();
  newUser.name = user.name;
  newUser.login = user.login;
  newUser.passwordHash = user.password;
  await newUser.save();
  return toModel(newUser);
};

type UserUpdateData = {
  name: Maybe<string>;
  password: Maybe<string>;
};


const updateUser = async (
  id: string,
  data: UserUpdateData
): Promise<Maybe<User>> => {
  const user = await DBUser.findOne({id});
  if (!user) {
    return undefined;
  }
  user.name = data.name ? data.name : user.name;
  user.passwordHash = data.password ? data.password : user.passwordHash;
  await user.save();
  return toModel(user);
};

const deleteUser = async (id: string): Promise<boolean> => {
  const user = await DBUser.findOne({id});
  if (!user) {
    return false;
  }
  await user.remove();
  await taskService.deleteUserFromTasks(id);
  return true;
}

export default { getAll, getUserById, createUser, updateUser, deleteUser, findUserWithHash: findUserByLogin };
