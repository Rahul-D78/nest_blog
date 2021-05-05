import { Column, CreateDateColumn, Entity,  JoinTable,  ManyToMany,  OneToMany,  PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Article } from "./articles.entity";

@Entity('users')
export class User {
    @PrimaryColumn()
    email: string

    @Column({nullable: false ,unique: true})
    username: string

    @Column({nullable: true})
    password?: string

    token: string

    @OneToMany(() => Article, article => article.author)
    article : Article

    @ManyToMany(() => Article)
    @JoinTable()
    favorites: Article[]

    @CreateDateColumn({type: "date"})
    createdAt: Date

    @UpdateDateColumn({type: "date"})
    updatedAt: Date
}