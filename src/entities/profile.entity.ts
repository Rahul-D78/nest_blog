import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('follows')
export class FollowsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    followerEmail: string

    @Column()
    followingEmail: string
}