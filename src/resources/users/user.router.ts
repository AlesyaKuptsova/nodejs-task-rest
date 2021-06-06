import * as express from 'express';

import User from './user.model';

import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.status(404).json();
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.status(404).json();
  }
});

router.route('/:id').delete(async (req, res) => {
  if (await usersService.deleteUser(req.params.id)) {
    res.status(204).json();
  } else {
    res.status(404).json();
  }
});

export default router;
