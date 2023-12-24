import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseAPIDocuments } from './config/swagger.documents';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new BaseAPIDocuments().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('jisu-api', app, document);

  await app.listen(3000);
}
bootstrap();
