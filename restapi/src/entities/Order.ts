import { Entity, Column, ObjectIdColumn, PrimaryColumn, AfterLoad } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { ProductInOrder } from "./ProductInOrder";

@Entity()
export class Order {

    constructor(userEmail: string, products: ProductInOrder[]) {
        this.user = userEmail;
        this.products = products;
        this.price = 0.0;
        this.priceBeforeIVA = 0.0;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    user: string;

    @Column()
    products: ProductInOrder[];

    @Column()
    price: number;

    @Column()
    priceBeforeIVA: number;


}