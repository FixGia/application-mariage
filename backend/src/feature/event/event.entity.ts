import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  eventId: UUID;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  creatorId: string; 

  @Prop({ type: [String], default: [] })
  invitedUserIds: string[]; 
}

export const EventSchema = SchemaFactory.createForClass(Event);
