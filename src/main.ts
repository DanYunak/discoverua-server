import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PassportModule } from '@nestjs/passport';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)

  const clientUrl = process.env.CLIENT_URL

  app.enableCors({
    origin: clientUrl,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new TransformInterceptor)

  const port = process.env.PORT

  await app.listen(port)

  logger.log(`Application listening on port ${port}`)
}
bootstrap()
