import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async create(userData: any): Promise<User> {
    const hashed = await bcrypt.hash(userData.password, 10);
    const createdUser = new this.userModel({ ...userData, password: hashed });
    return createdUser.save();
  }
}
