import { Controller, Param, Post } from '@nestjs/common';
import { FollowsEntity } from '../../entities/profile.entity';
import { User } from '../users/users.decorator';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post(':username/follow')
    async followUser(@User('email') email: string, @Param() username: string): Promise<FollowsEntity> {
        return await this.profileService.follow(email, username);
    }
}
