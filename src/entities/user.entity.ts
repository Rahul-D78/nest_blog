import { Column, CreateDateColumn, Entity,  PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    email: string

    @Column({nullable: false ,unique: true})
    username: string

    @Column({nullable: true})
    password?: string

    token: string

    @CreateDateColumn({type: "date"})
    createdAt: Date

    @UpdateDateColumn({type: "date"})
    updatedAt: Date
}