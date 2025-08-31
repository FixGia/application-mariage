import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { JoinEventDto } from './dto/join-event.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
        if (!createEventDto.name || !createEventDto.date || !createEventDto.creatorId || !createEventDto.password) {
      throw new BadRequestException('name, date, creatorId, and password are required');
    }
    const eventId = randomUUID();
    const createdEvent = new this.eventModel({
      ...createEventDto,
      eventId,
      invitedUserIds: [createEventDto.creatorId],
    });
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findAllForUser(userId: string): Promise<Event[]> {
    return this.eventModel.find({ invitedUserIds: userId }).exec();
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventModel.findById(id).exec();
  }

  async remove(id: string): Promise<Event | null> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }

  async join(joinEventDto: JoinEventDto): Promise<Event> {
    const event = await this.eventModel.findOne({ name: joinEventDto.name }).exec();

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    if (event.password !== joinEventDto.password) {
      throw new BadRequestException('Invalid password');
    }

    if (event.invitedUserIds.includes(joinEventDto.userId)) {
      throw new BadRequestException('User already joined');
    }

    event.invitedUserIds.push(joinEventDto.userId);
    return event.save();
  }
}

