import { IsEmail, IsNotEmpty } from 'class-validator'

export class createUserDto {
   @IsEmail()
   readonly email: string
   
   @IsNotEmpty()
   readonly password: string

   @IsNotEmpty()
   readonly username: string
}