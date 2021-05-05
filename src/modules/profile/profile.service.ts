import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { FollowsEntity } from '../../entities/profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(FollowsEntity) private readonly followsRepo: Repository<FollowsEntity>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {}

    async follow(email: string, username: string): Promise<FollowsEntity> {
        
        if(!email && !username) throw new HttpException({message: "nothing provided"}, HttpStatus.BAD_REQUEST);
    
        const followingUser = await this.userRepo.findOne(username);
        const followerUser = await this.userRepo.findOne(email);

        if (followingUser.email === email) {
            throw new HttpException('FollowerEmail and FollowingId cannot be equal.', HttpStatus.BAD_REQUEST);
        }
        const _follows = await this.followsRepo.findOne( {followerEmail: followerUser.email, followingEmail: followingUser.email});
        if(!_follows) {
            const follows = new FollowsEntity();
            follows.followerEmail = followerUser.email;
            follows.followingEmail = followingUser.email;
            return await this.followsRepo.save(follows);
        }
    }
}
