import { Controller, Post, Body, BadRequestException, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Vérifie unicité email
    const exists = await this.authService.findByEmail(registerDto.email);
    if (exists) {
      throw new BadRequestException('Email already in use');
    }
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user : any = await this.authService.validateUser(email, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    // Génère un JWT
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    // Génère et stocke un refresh token
    const refreshToken = this.authService.generateRefreshToken();
    const userId = user._id;
    await this.authService.saveRefreshToken(userId, refreshToken);
    return { message: 'Login successful', token, refreshToken };
  }

  // --- Google OAuth2 ---
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport redirige automatiquement vers Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // req.user contient { googleId, email }
    const { googleId, email } = req.user as any;
    // Crée ou récupère l'utilisateur
    let user: any = await this.authService.findByGoogleId(googleId);
    if (!user) {
      user = await this.authService.createGoogleUser(googleId, email);
    }
    // Génère un JWT
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    // Génère et stocke un refresh token
    const refreshToken = this.authService.generateRefreshToken();
    await this.authService.saveRefreshToken(user._id, refreshToken);
    // Redirige ou renvoie le token et refreshToken (ici, renvoi JSON pour dev)
    return res.json({ token, refreshToken });
    // Pour une vraie app front, tu peux faire : res.redirect(`http://localhost:4200/login?token=${token}&refreshToken=${refreshToken}`)
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtected(@Req() req: Request) {
    return { message: 'Accès autorisé', user: req.user };
  }

  @Post('refresh')
  async refresh(@Body('userId') userId: string, @Body('refreshToken') refreshToken: string) {
    // Valide le refresh token
    const user : any = await this.authService.validateRefreshToken(userId, refreshToken);
    // Génère un nouveau JWT
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { token };
  }

  @Post('logout')
  async logout(@Body('userId') userId: string) {
    await this.authService.removeRefreshToken(userId);
    return { message: 'Déconnexion réussie' };
  }
}
