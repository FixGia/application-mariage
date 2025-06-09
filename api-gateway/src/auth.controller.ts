import { Controller, Post, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          process.env.AUTH_BACKEND_URL + '/register',
          body
        )
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Registration failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('login')
  async login(@Body() body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          process.env.AUTH_BACKEND_URL + '/login',
          body
        )
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Login failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
