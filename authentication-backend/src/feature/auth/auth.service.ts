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
    const createdUser = new this.userModel({ email, password: hashedPassword, role: 'user' });
    return createdUser.save();
  }

  async promoteToAdmin(userId: string) {
    // Met à jour le rôle d'un user en admin
    return this.userModel.findByIdAndUpdate(
      userId,
      { role: 'admin' },
      { new: true }
    );
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // --- RGPD ---
  async deleteUserById(userId: string) {
    // Supprime l'utilisateur (et ses refresh tokens)
    await this.userModel.findByIdAndDelete(userId);
    // Optionnel : supprimer d'autres données liées
    return;
  }

  async saveConsent(userId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { consentAcceptedAt: new Date() },
      { new: true }
    );
  }

  async exportUserData(userId: string) {
    // Exporte toutes les infos du user sauf le hash du password
    const user = await this.userModel.findById(userId).lean();
    if (!user) return null;
    const { password, refreshToken, ...userData } = user;
    return userData;
  }
}
