import "reflect-metadata";
import { exit } from "process";
import { config } from './common/config';
import { withDB } from './db';

import app from './app';
import { logger } from "./common/logger";

const { PORT, HOST } = config;

const port = Number(PORT);
const host = HOST || 'localhost';

try {
  withDB(() => {
    app.listen(port, host, () =>
      logger.info(`App is running on http://${host}:${port}`)
    );
  });
} catch(err) {
  logger.error(`failed ${err}`);
  exit(1);
}
