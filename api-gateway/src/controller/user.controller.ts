import { Controller, Get, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UpdateUserPayload } from '../payload/UpdateUserPayload';


@Controller('/api/users')
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  private backendUrl = process.env.BACKEND_URL;

  @Get()
  async findAll() {
    const { data } = await firstValueFrom(this.httpService.get(`${this.backendUrl}/users`));
    return data;
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${this.backendUrl}/users/${userId}`));
      return data;
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }

  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() updateUserPayload: UpdateUserPayload) {
    const { data } = await firstValueFrom(this.httpService.patch(`${this.backendUrl}/users/${userId}`, updateUserPayload));
    return data;
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    const { data } = await firstValueFrom(this.httpService.delete(`${this.backendUrl}/users/${userId}`));
    return data;
  }
}
