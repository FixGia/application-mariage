import { UUID } from "crypto";
export declare class CreateEventDto {
    eventId?: UUID;
    name: string;
    description: string;
    date: Date;
    creatorId: string;
}
