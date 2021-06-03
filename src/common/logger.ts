import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.cli(), format.json()),
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.cli(), format.json()),
    }),
  ],
});

export { logger };
