import { UUID } from 'crypto';
import { Document } from 'mongoose';
export declare class Event extends Document {
    eventId: UUID;
    name: string;
    description?: string;
    date: Date;
    creatorId: string;
    invitedUserIds: string[];
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, Document<unknown, any, Event, any> & Event & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, import("mongoose").FlatRecord<Event>, {}> & import("mongoose").FlatRecord<Event> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
