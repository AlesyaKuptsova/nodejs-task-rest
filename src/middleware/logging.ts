import { Request, Response, NextFunction } from 'express';
import { logger } from '../common/logger';

const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { url } = req;
  const { ip } = req;
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);
  res.on('finish', (): void => {
    logger.info(
      `request: ${ip} ${url} query="${query}" body="${body}" code=${res.statusCode}`
    );
  });
  next();
};

export { logRequest };
