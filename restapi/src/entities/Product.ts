import { Entity, Column, ObjectIdColumn, PrimaryColumn, Unique } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
@Unique('unique_name', ['name'])
export class Product {

    constructor(name: string, description: string, price: number, category: string, urlPhoto: string, stock: number) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.urlPhoto = urlPhoto;
        this.stock =  stock;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column()
    urlPhoto: string;

    @Column()
    stock: number;

}