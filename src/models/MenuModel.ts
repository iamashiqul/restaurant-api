import mongoose from 'mongoose';
import { MenuSchema } from '../menu/schemas/menu.schema';

export const MenuModel = mongoose.model('Menu', MenuSchema);
