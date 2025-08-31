import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findOne(userId: string): Promise<User | null>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<User | null>;
    remove(userId: string): Promise<User | null>;
}
