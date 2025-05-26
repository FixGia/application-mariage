import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mongoUrl = process.env.MONGO_URL || "mongodb://user:user@mongo:27017/mariage-app";
@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    require('../feature/auth/auth.module').AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
