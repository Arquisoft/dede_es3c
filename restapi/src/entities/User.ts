import { Entity, Column, ObjectIdColumn, ObjectID, Unique, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
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

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    rol: string;

}