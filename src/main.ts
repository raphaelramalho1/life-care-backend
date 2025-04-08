// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { existsSync, statSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuração do CORS para permitir requisições do frontend
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:8100',
      'https://lifecare-c2f8f.web.app',
      'https://lifecare-c2f8f.firebaseapp.com'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Cuidador de Idosos')
    .setDescription('API para o aplicativo de cuidadores de idosos')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validação global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configurar pasta para servir arquivos estáticos do PWA
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Configurar pasta para servir o index.html para rotas que não são explicitamente definidas
  // Isso é necessário para o funcionamento do PWA/SPA
  app.use((req, res, next) => {
    // Pular para o próximo middleware se for uma requisição para a API ou autenticação
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/auth')) {
      return next();
    }
    
    // Verificar se é um arquivo estático
    const requestedPath = join(__dirname, '..', 'public', req.originalUrl);
    if (existsSync(requestedPath) && statSync(requestedPath).isFile()) {
      return next();
    }
    
    // Se não for um arquivo estático e não for uma API, servir o index.html
    return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  await app.listen(3001);
}
bootstrap();
