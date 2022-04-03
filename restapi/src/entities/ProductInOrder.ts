import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { Product } from "./Product"

@Entity()
export class ProductInOrder {

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    product: Product;

    @Column()
    quantity: number;
    

}