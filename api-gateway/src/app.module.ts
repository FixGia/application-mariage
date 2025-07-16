import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AuthController } from './controller/auth.controller';
import { EventController } from './controller/event.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, AuthController, EventController],
  providers: [],
})
export class AppModule {}
