import { Model } from 'mongoose';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventService {
    private eventModel;
    constructor(eventModel: Model<Event>);
    create(createEventDto: CreateEventDto): Promise<Event>;
    findAll(): Promise<Event[]>;
    findOne(id: string): Promise<Event | null>;
    remove(id: string): Promise<Event | null>;
}
