import * as express from 'express';

import usersService from '../users/user.service';

const router = express.Router();

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const token = await usersService.signToken(login, password);

  if (!token) {
    res.status(403).send('Wrong login/password combination');
  } else {
    res.status(200).json({ token });
  }
});

export default router;
