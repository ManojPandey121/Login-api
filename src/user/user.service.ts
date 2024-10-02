import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) { }

    async getUserByUsername(username: string) {
        return this.userModel.findOne({
            username
        })
            .exec();
    }

    async registerUser(createUserDto: CreateUserDto) {
        // validate DTO
        console.log(22, createUserDto);
        const createUser = new this.userModel(createUserDto);
        console.log(24, createUserDto);
        // check if user exists
        const user = await this.getUserByUsername(createUser.username);
        console.log(27, createUserDto);
        if (user) {
            throw new BadRequestException();
        }
        // Hash Password
        createUser.password = await this.hashService.hashPassword(createUser.password);
        console.log(createUser)

        const savedUser = await createUser.save();
        return { success: true, data: savedUser, message: "User Created Successfully" }
    }
}