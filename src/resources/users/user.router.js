const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(
  async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  }
);

router.route('/').post(
 async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(200).json(User.toResponse(user));
  }
);

module.exports = router;
