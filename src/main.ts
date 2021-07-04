import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestApplicationOptions } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { CustomLogger } from './logging/logger';
import { config } from './common/config';

const logger = new CustomLogger();

async function run(module: AppModule, opts: NestApplicationOptions) {
  if (config.USE_FASTIFY) {
    logger.log('using fastify');
    return NestFactory.create<NestFastifyApplication>(module, opts);
  }
  logger.log('using express');
  return NestFactory.create<NestExpressApplication>(module, opts);
}

async function bootstrap() {
  const app = await run(AppModule, { logger });
  await app.listen(4000);
}
bootstrap();
