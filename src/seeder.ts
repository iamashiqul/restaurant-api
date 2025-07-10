import mongoose from 'mongoose';
import { CategoryModel } from './models/CategoryModel';
import { MenuModel } from './models/MenuModel';

async function seed() {
  if (!process.env.MONGO_URI || !process.env.DB_PASSWORD) {
    throw new Error('MONGO_URI or DB_PASSWORD is not defined in environment variables.');
  }
  await mongoose.connect(process.env.MONGO_URI.replace('${DB_PASSWORD}', process.env.DB_PASSWORD));

  const category = await new CategoryModel({ name: 'Makanan' }).save();
  const menu = await new MenuModel({
    name: 'Nasi Goreng',
    price: 20000,
    description: 'Pedas dan gurih',
    category: category._id,
  }).save();

  console.log('Seeder selesai:', { category, menu });
  await mongoose.disconnect();
}

seed();
