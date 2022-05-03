import { DeleteResult, UpdateResult } from 'typeorm';
import { Application } from 'express';
import { Order } from '../entities/Order';

export class OrderService {

    /**
     * Return all orders
     * @param app Express application
     * @returns Promise<Order[]>
     */
    public static getOrders(app: Application): Promise<Order[]> {
        return app.get('db').getRepository(Order).find();
    }

    /**
     * Return all orders
     * @param app Express application
     * @returns Promise<Order[]>
     */
     public static getOrdersByUserEmail(app: Application, email: string): Promise<Order[]> {
        return app
            .get('db')
            .getRepository(Order)
            .find({
            where:{
                user: email,
            },
        });
    }

    /**
     * Return order by id
     * @param app Express application
     * @param id Order id
     * @returns Promise<Order>
     */
    public static getOrderById(app: Application, id: string): Promise<Order> {
        return app.get('db').getRepository(Order).findOne({
            where: {
                id: id
            }
        });
    }

    /**
     * Delete order by id
     * @param app Express application
     * @param id Order id
     * @returns Promise<DeleteResult>
     */
    public static deleteOrder(app: Application, id: string): Promise<DeleteResult> {
        return app.get('db').getRepository(Order).delete({id: id});
    }

    /**
     * Add new order
     * @param app Express application
     * @param order Order object
     * @returns Promise<Order>
     */
    public static addOrder(app: Application, order: Order): Promise<Order> {
        return app.get('db').getRepository(Order).save(order);
    }

    /**
     * Update order by id
     * @param app Express application
     * @param id Order id
     * @param order Order object
     * @returns Promise<UpdateResult>
     */
    public static updateOrder(app: Application, id: string, order: Order): Promise<UpdateResult> {
        return app.get('db').getRepository(Order).update({id: id}, order);
    }

    /**
     * Update order by id
     * @param app Express application
     * @param id Order id
     * @param order Order object
     * @returns Promise<UpdateResult>
     */
     public static updatePriceOrder(app: Application, id: string, price: number): Promise<UpdateResult> {
        return app.get('db').getRepository(Order).updateOne({ id: id }, { $inc: { price: price } });
    }

}