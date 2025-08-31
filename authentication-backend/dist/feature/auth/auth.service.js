"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../schema/user.schema");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
let AuthService = class AuthService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async findById(userId) {
        return this.userModel.findById(userId);
    }
    async findByGoogleId(googleId) {
        return this.userModel.findOne({ googleId });
    }
    async createGoogleUser(googleId, email) {
        const createdUser = new this.userModel({ googleId, email, password: '' });
        return createdUser.save();
    }
    generateRefreshToken() {
        return crypto.randomBytes(64).toString('hex');
    }
    async saveRefreshToken(userId, refreshToken) {
        await this.userModel.findByIdAndUpdate(userId, { refreshToken });
    }
    async removeRefreshToken(userId) {
        await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
    }
    async validateRefreshToken(userId, refreshToken) {
        const user = await this.userModel.findById(userId);
        if (!user || user.refreshToken !== refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token invalide');
        }
        return user;
    }
    async register(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({ email, password: hashedPassword, role: 'user' });
        return createdUser.save();
    }
    async promoteToAdmin(userId) {
        return this.userModel.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async deleteUserById(userId) {
        await this.userModel.findByIdAndDelete(userId);
        return;
    }
    async saveConsent(userId) {
        return this.userModel.findByIdAndUpdate(userId, { consentAcceptedAt: new Date() }, { new: true });
    }
    async exportUserData(userId) {
        const user = await this.userModel.findById(userId).lean();
        if (!user)
            return null;
        const { password, refreshToken, ...userData } = user;
        return userData;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map