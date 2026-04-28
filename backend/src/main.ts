import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './config/env.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: env.CORS_ORIGIN,
  });
  const httpExceptionFilter = new HttpExceptionFilter();
  app.useGlobalFilters(httpExceptionFilter);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(env.BACKEND_PORT);
}

bootstrap();
