import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

const logInfo = (req: Request, _: Response, next: NextFunction): void => {
  logger.info(
    `request: ${req.path}: ${JSON.stringify(req.query)} ${JSON.stringify(
      req.body
    )}`
  );
  next();
};

export { logInfo };
