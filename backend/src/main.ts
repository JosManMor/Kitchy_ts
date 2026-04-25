import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './config/env.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(env.BACKEND_PORT);
}

bootstrap();
