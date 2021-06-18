import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env['NODE_PORT'],
  HOST: process.env['NODE_HOST'],
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['NODE_AUTH_MODE'] === 'true',
};

export { config };
