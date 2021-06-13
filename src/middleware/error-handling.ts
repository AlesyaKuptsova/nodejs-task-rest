import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../common/logger';

const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  logger.error(`unhandled error: ${err.name}: ${err.message}`);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
};

export { errorHandler };
