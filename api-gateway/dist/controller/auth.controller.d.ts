import { HttpService } from '@nestjs/axios';
export declare class AuthController {
    private readonly httpService;
    constructor(httpService: HttpService);
    register(body: any): Promise<any>;
    login(body: any): Promise<any>;
    deleteMe(authorization: string): Promise<any>;
    exportMe(authorization: string): Promise<any>;
    saveConsent(authorization: string): Promise<any>;
}
