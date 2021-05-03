import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({type: "date"})
    createdAt: Date

    @UpdateDateColumn({type: "date"})
    updatedAt: Date
}