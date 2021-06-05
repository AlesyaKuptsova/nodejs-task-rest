import { createLogger, format, transports } from 'winston';

const fileFormat = format.combine(format.uncolorize(), format.json());

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: fileFormat,
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: fileFormat,
    }),
  ],
});

export { logger };
