import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
export class ProductStore {

    constructor(distributioncenter_id: string, product_id: string, stock: number) {
        this.distributioncenter_id = distributioncenter_id;
        this.product_id = product_id;
        this.stock = stock;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    distributioncenter_id: string;

    @Column()
    product_id: string;

    @Column()
    stock: number;

    
    

}