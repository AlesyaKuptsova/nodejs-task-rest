import "reflect-metadata";
import { config } from './common/config';
import { withDB } from './db';

import app from './app';

const { PORT, HOST } = config;

const port = Number(PORT);
const host = HOST || 'localhost';

withDB(() => {
  app.listen(port, host, () =>
    console.log(`App is running on http://${host}:${port}`)
  );
});
