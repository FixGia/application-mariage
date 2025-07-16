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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AuthController = class AuthController {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
        console.log("auth controller ready");
    }
    async register(body) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(process.env.AUTH_BACKEND_URL + '/register', body));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data || 'Registration failed', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(process.env.AUTH_BACKEND_URL + '/login', body));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data || 'Login failed', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteMe(authorization) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(process.env.AUTH_BACKEND_URL + '/me', {
                headers: {
                    Authorization: authorization,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data || 'Delete account failed', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async exportMe(authorization) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(process.env.AUTH_BACKEND_URL + '/me/export', {
                headers: {
                    Authorization: authorization,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data || 'Export data failed', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async saveConsent(authorization) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(process.env.AUTH_BACKEND_URL + '/me/consent', {}, { headers: {
                    Authorization: authorization,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data || 'Save consent failed', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Delete)('me'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteMe", null);
__decorate([
    (0, common_1.Get)('me/export'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "exportMe", null);
__decorate([
    (0, common_1.Post)('consent'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "saveConsent", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)(axios_1.HttpService)),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map