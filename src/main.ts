import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );
  const bullPort = process.env.PORT || 3000;
  await app.listen(bullPort, async () => {
    Logger.log(`Application is running on: ${await app.getUrl()}`, 'Main');
  });
}
bootstrap();
