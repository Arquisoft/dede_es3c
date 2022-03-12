import { Entity, Column, ObjectIdColumn, ObjectID, Unique, PrimaryColumn, Double } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Order {

    constructor(user: User, products: Product[]) {
        this.user = user;
        this.products = products;
        this.price = this.calculatePrice();
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    user: User;

    @Column()
    products: Product[];

    @Column()
    price: Double;

    public calculatePrice():Double{
        var p = 0.0;
        for (var product of this.products) {
            p=p+product.price;
        }
        return p;
    }


}