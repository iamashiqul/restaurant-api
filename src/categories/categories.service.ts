import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private model: Model<Category>) {}

  create(dto: CreateCategoryDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, dto: CreateCategoryDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
