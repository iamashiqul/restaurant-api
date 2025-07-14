import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import { CategorySchema } from './categories/schemas/category.schema';
import { MenuSchema } from './menu/schemas/menu.schema';
import { OrderSchema } from './orders/schemas/order.schema';
import { UserSchema } from './users/schemas/user.schema';

const MONGO_URI = process.env.MONGO_URI?.replace(
  '${DB_PASSWORD}',
  process.env.DB_PASSWORD ?? '',
);

const CategoryModel = mongoose.model('Category', CategorySchema);
const MenuModel = mongoose.model('Menu', MenuSchema);
const OrderModel = mongoose.model('Order', OrderSchema);
const UserModel = mongoose.model('User', UserSchema);

async function seed() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI not found in environment variables.');
  }

  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB connected for seeding');

  // 1. Buat user dummy
  const user = await new UserModel({
    name: 'Dummy User',
    email: 'dummy@example.com',
    password: 'hashed_password', // hashing dilakukan otomatis jika pakai pre-save
    role: 'customer',
  }).save();

  // 2. Buat kategori
  const foodCat = await new CategoryModel({ name: 'Makanan' }).save();
  const drinkCat = await new CategoryModel({ name: 'Minuman' }).save();

  // 3. Buat menu
  const nasiGoreng = await new MenuModel({
    name: 'Nasi Goreng',
    price: 25000,
    description: 'Nasi goreng spesial dengan telur dan ayam',
    category: foodCat._id,
  }).save();

  const esTeh = await new MenuModel({
    name: 'Es Teh Manis',
    price: 8000,
    description: 'Teh segar dengan gula batu',
    category: drinkCat._id,
  }).save();

  // 4. Buat order
  await new OrderModel({
    user: user._id,
    items: [
      { menu: nasiGoreng._id, quantity: 2 },
      { menu: esTeh._id, quantity: 1 },
    ],
    status: 'pending',
    totalPrice: nasiGoreng.price * 2 + esTeh.price,
  }).save();

  console.log('✅ Dummy data created successfully');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seeder error:', err.message);
});
