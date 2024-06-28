import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.setup';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );
  const bullPort = process.env.PORT || 3000;
  await app.listen(bullPort, async () => {
    Logger.debug(`Application is running on: ${await app.getUrl()}`, 'Main');
  });
}
bootstrap();
