import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
export class User {

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

    @ObjectIdColumn()
    id: ObjectID | undefined;

    @Column()
    username: string;

    @Column()
    email: string;

}