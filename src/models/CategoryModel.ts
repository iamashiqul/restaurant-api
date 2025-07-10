import mongoose from 'mongoose';
import { CategorySchema } from '../categories/schemas/category.schema';

export const CategoryModel = mongoose.model('Category', CategorySchema);
