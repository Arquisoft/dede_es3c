import { Entity, Column, ObjectIdColumn, PrimaryColumn, AfterLoad } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { User } from "./User";
import { ProductInOrder } from "./ProductInOrder";

@Entity()
export class Order {

    constructor(userEmail: string, products: ProductInOrder[]) {
        this.user = userEmail;
        this.products = products;
        this.price = 0.0;
        this.priceIVA = 0.0;
        //this.distributionCenter = "";
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
    priceIVA: number;

    /*@Column()
    distributionCenter: string;*/
 
    


}