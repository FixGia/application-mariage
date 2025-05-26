import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schema/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findByGoogleId(googleId: string) {
    return this.userModel.findOne({ googleId });
  }

  async createGoogleUser(googleId: string, email: string) {
    const createdUser = new this.userModel({ googleId, email, password: '' });
    return createdUser.save();
  }

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({ email, password: hashedPassword });
    return createdUser.save();
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
