import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    username: string;

    @Column()
    email: string;

}