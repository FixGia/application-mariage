import { HttpService } from '@nestjs/axios';
import { UpdateUserPayload } from '../payload/UpdateUserPayload';
export declare class UserController {
    private readonly httpService;
    constructor(httpService: HttpService);
    private backendUrl;
    findAll(): Promise<any>;
    findOne(userId: string): Promise<any>;
    update(userId: string, updateUserPayload: UpdateUserPayload): Promise<any>;
    remove(userId: string): Promise<any>;
}
