import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
