import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
  if (process.env.MONGO_URI) {
    console.log(`✅ MongoDB Connected to ${process.env.MONGO_URI.split('@')[1].split('/')[0]}`);
  } else {
    console.log('❌ MONGO_URI is not defined in environment variables.');
  }
}
bootstrap();

