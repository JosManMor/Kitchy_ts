import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './config/env.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { Express } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.disable('x-powered-by');
  app.enableCors({
    origin: env.CORS_ORIGIN,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Kitchy')
    .setDescription('The kitchy API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(env.BACKEND_PORT);
}

bootstrap();
