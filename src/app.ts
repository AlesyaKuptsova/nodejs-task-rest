import express from 'express';

import swaggerUI from 'swagger-ui-express';

import path from 'path';

import YAML from 'yamljs';

import userRouter from './resources/users/user.router';

import boardRouter from './resources/boards/board.router';

import taskRouter from './resources/tasks/task.router';

import  {checkAuth } from './middleware/auth';

import { logRequest } from './middleware/logging';

import { errorHandler } from './middleware/error-handling';

import loginRouter from './resources/login/login.router';

import { logger } from './common/logger';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logRequest);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', [checkAuth, userRouter]);
app.use('/boards', [checkAuth, boardRouter, taskRouter]);

app.use(errorHandler);

process.on('uncaughtException', (error) => {
  logger.error(`captured error: ${error.message}`);
  setTimeout(() => {
    const { exit } = process;
    exit(1);
  }, 1000);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    `Unhandled rejection detected: ${reason} 'Unhandled Rejection at:' ${promise} `
  );
  setTimeout(() => {
    const { exit } = process;
    exit(1);
  }, 1000);
});

export default app;
