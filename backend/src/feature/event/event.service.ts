import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    if (!createEventDto.name || !createEventDto.date || !createEventDto.creatorId) {
      throw new BadRequestException('name, date, and creatorId are required');
    }
    const eventId = randomUUID();
    const createdEvent = new this.eventModel({
      ...createEventDto,
      eventId,
      invitedUserIds: [],
    });
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventModel.findById(id).exec();
  }

  async remove(id: string): Promise<Event | null> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}

