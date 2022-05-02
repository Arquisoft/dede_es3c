import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
export class Product {

    constructor(name: string, description: string, price: number, category: string, urlPhoto: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.urlPhoto = urlPhoto;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column()
    urlPhoto: string;
}