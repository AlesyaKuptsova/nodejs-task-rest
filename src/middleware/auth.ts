import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { config } from '../common/config';

async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const key = config.JWT_SECRET_KEY || '';
      jwt.verify(token, key, (err) => {
        if (err) {
          res.status(401).send('Unauthorized error');
        } else {
          next();
        }
      });
    } else {
      res.status(400).send('400 Bad Request');
    }
  } else {
    res.status(401).send('Unauthorized error');
  }
}

export { checkAuth };
