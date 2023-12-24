import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class BaseAPIDocuments {
  public builder = new DocumentBuilder();
  public initializeOptions() {
    return this.builder
      .addBearerAuth()
      .setTitle('Jisu API')
      .setDescription('Jisu API')
      .setVersion('1.0')
      .build();
  }
}