import { Controller, Post, Body, BadRequestException, Get, UseGuards, Req, Res, HttpCode, UnauthorizedException, NotFoundException, ForbiddenException, Delete } from '@nestjs/common';
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
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    // Vérifie unicité email
    const exists = await this.authService.findByEmail(registerDto.email);
    if (exists) {
      throw new BadRequestException('Email already in use'); // 400
    }
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user : any = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // 401
    }
    // Génère un JWT incluant le rôle
    const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });
    // Génère et stocke un refresh token
    const refreshToken = this.authService.generateRefreshToken();
    const userId = user._id;
    await this.authService.saveRefreshToken(userId, refreshToken);
    return { message: 'Login successful', token, refreshToken };
  }

  @Post('promote')
  @UseGuards(AuthGuard('jwt'))
  async promote(@Body('userId') userId: string, @Req() req: any) {
    // Vérifie que l'appelant est admin
    const currentUser = req.user;
    if (!currentUser || currentUser.role !== 'admin') {
      throw new ForbiddenException('Only admin can promote users'); // 403
    }
    const updatedUser = await this.authService.promoteToAdmin(userId);
    if (!updatedUser) {
      throw new BadRequestException('User not found or already admin.'); // 400
    }
    return { message: 'User promoted to admin', user: updatedUser };
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
  @HttpCode(200)
  async refresh(@Body('userId') userId: string, @Body('refreshToken') refreshToken: string) {
    // Valide le refresh token
    const user : any = await this.authService.validateRefreshToken(userId, refreshToken);
    // Génère un nouveau JWT
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { token };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Body('userId') userId: string) {
    await this.authService.removeRefreshToken(userId);
    return { message: 'Déconnexion réussie' };
  }

  // --- RGPD ---
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  async deleteMe(@Req() req: any) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    await this.authService.deleteUserById(userId);
    return { message: 'Votre compte a été supprimé avec succès.' };
  }

  @Get('me/export')
  @UseGuards(AuthGuard('jwt'))
  async exportMe(@Req() req: any) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    const userData = await this.authService.exportUserData(userId);
    return { data: userData };
  }

  @HttpCode(201)
  @Post('consent')
  @UseGuards(AuthGuard('jwt'))
  async saveConsent(@Req() req: any) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    await this.authService.saveConsent(userId);
    const user = await this.authService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { consentAcceptedAt: user.consentAcceptedAt };
  }
}
