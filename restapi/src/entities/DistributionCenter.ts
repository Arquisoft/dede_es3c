import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { ProductStore } from "./ProductStore";

@Entity()
export class DistributionCenter {

    constructor(address: string, store: ProductStore[]) {
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
    store: ProductStore[];

    

}