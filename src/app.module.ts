import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      (process.env.MONGO_URI ? process.env.MONGO_URI.replace('${DB_PASSWORD}', process.env.DB_PASSWORD) : ''),
    ),
    // Import other modules: AuthModule, UserModule, etc
  ],
})
export class AppModule {}
