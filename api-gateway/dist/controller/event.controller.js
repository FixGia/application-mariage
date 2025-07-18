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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let EventController = class EventController {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async findAll() {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.BACKEND_URL}/api/events`));
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch events', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async findOne(id) {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.BACKEND_URL}/api/events/${id}`));
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch event', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async create(body) {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${process.env.BACKEND_URL}/api/events`, body));
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create event', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async remove(id) {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${process.env.BACKEND_URL}/api/events/${id}`));
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete event', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "remove", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('/api/events'),
    __param(0, (0, common_1.Inject)(axios_1.HttpService)),
    __metadata("design:paramtypes", [axios_1.HttpService])
], EventController);
//# sourceMappingURL=event.controller.js.map