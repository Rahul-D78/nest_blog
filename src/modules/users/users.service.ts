import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { sanitization } from '../../utils/security.utils';
import { createUserDto } from './dto/create-users.dto';
import { validate } from 'class-validator';
import { hashPass, matchPass } from '../../utils/password.utils';
import { LoginDto } from './dto/login-user.dto';
import { sign } from '../../utils/jwt.utils';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async getUserById(userId: number): Promise<User> {
        const foundUser = await this.userRepo.findOne(userId);
        if(!foundUser) throw new NotFoundException({status: HttpStatus.NOT_FOUND ,error: 'user with this id not found'});
        return sanitization(foundUser);
    }

    async registerUser(data: createUserDto): Promise<User> {
        
        const {username, email, password} = data;
        //check the uniqueness in the user entered data :
        const repo = getRepository(User);
        const existingUsername =await repo.findOne(username);
        const existingEmail = await repo.findOne(email); 

        if(existingEmail && existingUsername) throw new HttpException({message: "Input data validation failed username and password must be unique"}, HttpStatus.UNPROCESSABLE_ENTITY);
        //save a new user to the db
        const newUser = new User();
        newUser.username = username;
        newUser.password = await hashPass(password);
        newUser.email = email;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = {username: 'Userinput is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        }else {
            const savedUser = await this.userRepo.save(newUser);
            return sanitization(savedUser);
        }    
    }

    async loginUser(data: LoginDto): Promise<User> {
        const {email , password} = data;
        //check for the user existance
        const repo = getRepository(User);
        const user = await repo.findOne(email);
        if(!user) throw new HttpException({message: "No user with this email exists"}, HttpStatus.UNPROCESSABLE_ENTITY);

        //check if the password matches
        const passMatch = await matchPass(user.password, password);
        if(passMatch == false) throw new HttpException({message: "Wrong Password"}, HttpStatus.UNPROCESSABLE_ENTITY);

        user.token = await sign(user);
        return sanitization(user);
    }
}
