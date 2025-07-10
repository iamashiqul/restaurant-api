import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
    constructor(@InjectModel(Menu.name) private model: Model<Menu>) {}

    create(dto: CreateMenuDto) {
        return this.model.create(dto);
    }

    findAll() {
        return this.model.find().populate('category').exec();
    }

    findOne(id: string) {
        return this.model.findById(id).populate('category').exec();
    }

    update(id: string, dto: CreateMenuDto) {
        return this.model.findByIdAndUpdate(id, dto, { new: true }).populate('category');
    }

    remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}