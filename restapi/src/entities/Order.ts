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

    @AfterLoad()
    getPrice() {
        var p = 0.0;
        for (var pr of this.products) {
            p=p+pr.product.price*pr.quantity;
        }
        this.price = p;

        //Calcular distancia
        //var distance=mapa.calculateDistance("Avenida de la Constitución, 10, Gijón");
        //console.log(distance);

        //Calcular precio de envío
        //this.price += this.calculateShippingPrice(distance);

        this.getPriceIVA();
    }

    getPriceIVA(){
        this.priceIVA = this.price*1.21;
    }

    @AfterLoad()
    decrementStock(){
        for (var pr of this.products) {
            //Comprobar si tengo stock suficiente
            //pr.product.stock-=pr.quantity;

        }
    }


    



}