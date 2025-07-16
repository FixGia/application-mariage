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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_entity_1 = require("./event.entity");
const crypto_1 = require("crypto");
let EventService = class EventService {
    eventModel;
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async create(createEventDto) {
        if (!createEventDto.name || !createEventDto.date || !createEventDto.creatorId) {
            throw new common_1.BadRequestException('name, date, and creatorId are required');
        }
        const eventId = (0, crypto_1.randomUUID)();
        const createdEvent = new this.eventModel({
            ...createEventDto,
            eventId,
            invitedUserIds: [],
        });
        return createdEvent.save();
    }
    async findAll() {
        return this.eventModel.find().exec();
    }
    async findOne(id) {
        return this.eventModel.findById(id).exec();
    }
    async remove(id) {
        return this.eventModel.findByIdAndDelete(id).exec();
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_entity_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventService);
//# sourceMappingURL=event.service.js.map