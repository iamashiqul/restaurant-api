import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// Import modul-modul fitur
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    // Load .env secara global
    ConfigModule.forRoot({ isGlobal: true }),

    // Koneksi ke MongoDB
    MongooseModule.forRoot(
      process.env.MONGO_URI
        ? process.env.MONGO_URI.replace('${DB_PASSWORD}', process.env.DB_PASSWORD ?? '')
        : '',
    ),

    // Module aplikasi
    AuthModule,
    CategoriesModule,
    MenuModule,
    OrdersModule,
  ],
})
export class AppModule {}
