import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { Product } from "./Product";

@Entity()
export class DistributionCenter {

    constructor(address: string, store: Map<Product,number>) {
        this.address = address;
        this.store = store;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    address: string;

    @Column()
    store: Map<Product,number>;

    

}