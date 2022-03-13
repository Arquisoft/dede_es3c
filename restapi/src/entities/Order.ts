import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { User } from "./User";
import { ProductInOrder } from "./ProductInOrder";

@Entity()
export class Order {

    constructor(user: User, products: ProductInOrder[]) {
        this.user = user;
        this.products = products;
        this.price = 0.0;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    user: User;

    @Column()
    products: ProductInOrder[];

    @Column()
    price: number;


    /*
    public onLoad(){
        var p = 0.0;
        for (var pr of this.products) {
            console.log(pr.price);
            p=p+pr.price;
        }
        console.log("Total: "+p);
        this.price = p;
    }*/



}