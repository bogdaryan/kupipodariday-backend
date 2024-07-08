import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { nestCsrf } from 'ncsrf';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());
  app.use(nestCsrf());

  app.enableCors();

  app.use(
    session({
      secret: process.env.SECRET_SESSION_KEY,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет свойства, которые не указаны в DTO
      forbidNonWhitelisted: true, // Бросает ошибку, если объект содержит неизвестные свойства
      transform: true, // Преобразует входные данные в типы, указанные в DTO
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
