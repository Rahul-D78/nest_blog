import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    getAllUsers(): string[] {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: number): string {
        return this.usersService.getUserById(id);
    }
}
