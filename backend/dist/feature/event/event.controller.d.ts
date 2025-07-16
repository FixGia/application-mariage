import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    create(createEventDto: CreateEventDto): Promise<import("./event.entity").Event>;
    findOne(id: string): Promise<import("./event.entity").Event | null>;
    findAll(): Promise<import("./event.entity").Event[]>;
    remove(id: string): Promise<import("./event.entity").Event | null>;
}
