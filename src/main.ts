
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { AppModule } from './app.module';
import { CustomLogger } from './logging/logger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: new CustomLogger()});
  await app.listen(4000);
}
bootstrap();