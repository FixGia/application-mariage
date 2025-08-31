import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./user.schema").User[]>;
    findOne(userId: string): Promise<import("./user.schema").User>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<import("./user.schema").User | null>;
    remove(userId: string): Promise<import("./user.schema").User | null>;
}
