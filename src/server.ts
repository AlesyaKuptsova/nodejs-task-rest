import { config } from './common/config';

import app from './app';

const { PORT, HOST } = config;

const port = Number(PORT);
const host = HOST || 'localhost';

app.listen(port, host, () =>
  console.log(`App is running on http://${host}:${port}`)
);
