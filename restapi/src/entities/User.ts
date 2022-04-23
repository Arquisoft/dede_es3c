import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
export class User {

    constructor(username: string, email: string, salt: string,hash: string, rol: string) {
        this.username = username;
        this.email = email;
        this.salt = salt;
        this.hash = hash;
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
    salt: string;

    @Column()
    hash: string;

    @Column()
    rol: string;

}