import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      //Gql se encargar de esta propiedad por es esta en falso
      forbidNonWhitelisted: false,
    }),
  );
  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);

  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  await app.listen(3001);
}
bootstrap();
