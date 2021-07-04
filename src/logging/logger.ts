import { LoggerService } from '@nestjs/common';

import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const fileFormat = format.combine(format.uncolorize(), format.json());

export class CustomLogger implements LoggerService {
    private readonly logger = createLogger({
        level: 'silly',
        format: format.combine(format.colorize(), format.timestamp(), customFormat),
        transports: [
          new transports.Console(),
          new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: fileFormat,
          }),
          new transports.File({
            filename: 'logs/info.log',
            level: 'info',
            format: fileFormat,
          }),
        ],
      });

  log(message: string): void {
      this.logger.info(message);
  }

  error(message: string, trace: string): void {
      this.logger.error(`${message}: ${trace}`);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  verbose(message: string): void {
    this.logger.verbose(message);
  }
}
