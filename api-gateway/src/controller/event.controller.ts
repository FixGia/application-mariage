import { Controller, Get, Post, Delete, Param, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateEventPayload } from '../payload/CreateEventPayload';

@Controller('/api/events')
export class EventController {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
  ) {
  }

  @Get()
  async findAll() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${process.env.BACKEND_URL}/api/events`)
      );
      return data;
    } catch (error) {
      throw new HttpException('Failed to fetch events', HttpStatus.BAD_GATEWAY);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${process.env.BACKEND_URL}/api/events/${id}`)
      );
      return data;
    } catch (error) {
      throw new HttpException('Failed to fetch event', HttpStatus.BAD_GATEWAY);
    }
  }

  @Post()
  async create(@Body() body: CreateEventPayload) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(`${process.env.BACKEND_URL}/api/events`, body)
      );
      return data;
    } catch (error) {
      throw new HttpException('Failed to create event', HttpStatus.BAD_GATEWAY);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(`${process.env.BACKEND_URL}/api/events/${id}`)
      );
      return data;
    } catch (error) {
      throw new HttpException('Failed to delete event', HttpStatus.BAD_GATEWAY);
    }
  }
}
