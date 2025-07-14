import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global ValidationPipe: validasi otomatis DTO + class-validator
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Swagger configuration with JWT Bearer Auth
  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('API documentation for the restaurant app')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // ⬅️ Nama ini harus cocok dengan @ApiBearerAuth('access-token')
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Akses di http://localhost:3000/api

  await app.listen(3000);

  console.log(`🚀 Server running on http://localhost:3000`);
  console.log(`📘 Swagger docs at http://localhost:3000/api`);

  // ✅ Informasi MongoDB
  if (process.env.MONGO_URI) {
    console.log(`✅ MongoDB Connected to ${process.env.MONGO_URI.split('@')[1]?.split('/')[0]}`);
  } else {
    console.log('❌ MONGO_URI is not defined in environment variables.');
  }
}

bootstrap();
