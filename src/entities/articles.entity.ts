import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('articles')
export class Article {
    @PrimaryColumn({length: 40})
    slug: string
 
    @Column({length: 50})
    title?: string
 
    @Column({length: 100, nullable: true})
    description?: string
 
    @Column({type: 'text', nullable: false})
    body:string

    @ManyToOne(() => User)
    author: User

    @CreateDateColumn({type: "date"})
    createdAt: Date

    @UpdateDateColumn({type: "date"})
    updatedAt: Date
}