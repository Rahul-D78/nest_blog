import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "./articles.entity";

@Entity('comments')
export class Comment {
   @PrimaryGeneratedColumn()
    id : number 

    @Column()
    body: string

    @ManyToOne(() => Article)
    article: Article

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}