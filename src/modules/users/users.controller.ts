import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { createUserDto } from './dto/create-users.dto';
import { LoginDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.usersService.getUserById(id);
    }

    @Post('register')
    @HttpCode(201)
    async registerUser(@Body() data: createUserDto): Promise<User> {
        return await this.usersService.registerUser(data);
    }

    @Post('login')
    @HttpCode(201)
    async loginUser(@Body() data: LoginDto): Promise<User> {
        return await this.usersService.loginUser(data);
    }
}