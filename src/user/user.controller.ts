import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('register')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('username')
    getUserByUsername(@Param() param) {
        return this.userService.getUserByUsername(param.username);
    }
    @Post()
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.registerUser(createUserDto);
    }
}