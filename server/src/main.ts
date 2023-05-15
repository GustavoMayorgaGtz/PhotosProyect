import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(bodyParser.json({ limit: '50mb' })); // aumenta el límite de carga útil a 50 MB
  //Activar cors para recibir peticiones de otros servidores
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  //Configurando swagger para la documentacion de la API
  const config = new DocumentBuilder()
    .addBearerAuth() //Metodo utilizado para hacer aparecer un candadito
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log('servidor iniciado');
  console.log(await app.getUrl());
}
bootstrap();
