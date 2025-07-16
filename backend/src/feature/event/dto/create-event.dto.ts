import { UUID } from "crypto";

export class CreateEventDto {
  eventId?: UUID;
  name: string;
  description: string;
  date: Date;
  creatorId: string;
}
