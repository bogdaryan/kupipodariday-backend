import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { nestCsrf } from 'ncsrf';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());
  app.use(nestCsrf());

  app.use(
    session({
      secret: process.env.SECRET_SESSION_KEY,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
