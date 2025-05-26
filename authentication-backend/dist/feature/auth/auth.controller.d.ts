import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("../../schema/user.schema").User, {}> & import("../../schema/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        token?: undefined;
    } | {
        message: string;
        token: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
