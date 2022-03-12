import { Entity, Column, ObjectIdColumn, Unique, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
@Unique('unique_email', ['email'])  // make email unique
export class User {

    constructor(username: string, email: string, password: string, rol: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    rol: string;

}