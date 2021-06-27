import dotenv from 'dotenv';
import { exit } from 'process';
import { logger } from './logger';

dotenv.config();

function prepareKey() {
  const key = process.env['JWT_SECRET_KEY'];
  if(!key) {
    logger.error("JWT_SECRET_KEY is not configured");
    exit(2);
  }
  return key;
}

const config = {
  PORT: process.env['NODE_PORT'],
  HOST: process.env['NODE_HOST'],
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET_KEY: prepareKey(),
  AUTH_MODE: process.env['NODE_AUTH_MODE'] === 'true',
  ADMIN_PASSWORD: process.env['ADMIN_PASSWORD'],
};

export { config };
