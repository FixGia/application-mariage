import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }

  async findOne(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }).exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findOneAndUpdate({ userId }, updateUserDto, { new: true });
  }

  async remove(userId: string): Promise<User | null> {
    return this.userModel.findOneAndDelete({ userId });
  }
}

