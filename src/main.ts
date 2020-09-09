import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { UI } from 'bull-board';
import { AppModule } from './app.module';

export const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService: ConfigService = app.get('ConfigService');
  app.use('/admin/queues', UI);

  await app.listen(configService.get<number>('app.port'));
}

bootstrap();
