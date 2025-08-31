import { HttpService } from '@nestjs/axios';
import { CreateUserPayload } from '../payload/CreateUserPayload';
export declare class AuthController {
    private readonly httpService;
    constructor(httpService: HttpService);
    register(body: CreateUserPayload): Promise<any>;
    login(body: any): Promise<any>;
    deleteMe(authorization: string): Promise<any>;
    exportMe(authorization: string): Promise<any>;
    saveConsent(authorization: string): Promise<any>;
}
