import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schema/user.schema';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

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

  // Génère un refresh token (string random sécurisé)
  generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  // Sauvegarde le refresh token pour un user
  async saveRefreshToken(userId: string, refreshToken: string) {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken });
  }

  // Supprime le refresh token (logout)
  async removeRefreshToken(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
  }

  // Valide le refresh token et retourne le user si valide
  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token invalide');
    }
    return user;
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
