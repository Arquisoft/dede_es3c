import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { Product } from "./Product"
import { DistributionCenter } from "./DistributionCenter";

@Entity()
export class ProductInOrder {

    constructor(product: Product, quantity: number, distributionCenter: DistributionCenter) {
        this.product = product;
        this.quantity = quantity;
        this.shippingPrice = 0.0;
        this.distributionCenter = distributionCenter;
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

    @Column()
    shippingPrice: number;

    @Column()
    distributionCenter: DistributionCenter;
    

}