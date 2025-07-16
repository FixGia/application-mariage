import { HttpService } from '@nestjs/axios';
import { CreateEventPayload } from '../payload/CreateEventPayload';
export declare class EventController {
    private readonly httpService;
    constructor(httpService: HttpService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(body: CreateEventPayload): Promise<any>;
    remove(id: string): Promise<any>;
}
