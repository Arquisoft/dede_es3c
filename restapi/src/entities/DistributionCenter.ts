import { Entity, Column, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
export class DistributionCenter {

    constructor(address: string) {
        this.address = address;
        this.id = uuidv4();
    }

    @ObjectIdColumn()
    _id: string | undefined;
  
    @PrimaryColumn()
    id: string;

    @Column()
    address: string;

    

}