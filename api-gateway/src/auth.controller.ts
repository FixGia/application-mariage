import { Controller, Post, Body, HttpException, HttpStatus, Inject, Delete, Get, Headers } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
  ) {
    console.log("auth controller ready");
  }

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

  @Delete('me')
  async deleteMe(@Headers('authorization') authorization: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(
          process.env.AUTH_BACKEND_URL + '/me',
          {
            headers: {
              Authorization: authorization,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Delete account failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('me/export')
  async exportMe(@Headers('authorization') authorization: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          process.env.AUTH_BACKEND_URL + '/me/export',
          {
            headers: {
              Authorization: authorization,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Export data failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('consent')
  async saveConsent(@Headers('authorization') authorization: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          process.env.AUTH_BACKEND_URL + '/me/consent',
          {
            headers: {
              Authorization: authorization,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Save consent failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
