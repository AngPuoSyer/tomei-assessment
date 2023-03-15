import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    index: false,
    prefix: '/public',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  await app.listen(8000);
}
bootstrap();
