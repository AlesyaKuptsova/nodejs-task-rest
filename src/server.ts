import "reflect-metadata";
import { exit } from "process";
import { config } from './common/config';
import { withDB } from './db';

import app from './app';

const { PORT, HOST } = config;

const port = Number(PORT);
const host = HOST || 'localhost';

try {
  withDB(() => {
    app.listen(port, host, () =>
      console.log(`App is running on http://${host}:${port}`)
    );
  });
} catch(err) {
  console.error('failed', err);
  exit(1);
}
