import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { Product } from "./Product"

@Entity()
export class ProductStore {

    constructor(product: Product, stock: number) {
        this.product = product;
        this.stock = stock;
        //this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    /*@PrimaryColumn()
    id: string;*/

    @Column()
    product: Product;

    @Column()
    stock: number;
    

}