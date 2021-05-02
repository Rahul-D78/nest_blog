import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: number

    @Column({nullable: false, length: 20})
    name: string
}