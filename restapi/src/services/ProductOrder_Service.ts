import { DeleteResult, UpdateResult } from 'typeorm';
import { Application } from 'express';
import { ProductInOrder } from '../entities/ProductInOrder';

export class ProductOrderService {

    /**
     * Return all users
     * @param app Express application
     * @returns Promise<User[]>
     */
    public static getProducts(app: Application): Promise<ProductInOrder[]> {
        return app.get('db').getRepository(ProductInOrder).find();
    }

    /**
     * Return user by id
     * @param app Express application
     * @param id Product id
     * @returns Promise<User>
     */
    public static getProductById(app: Application, id: string): Promise<ProductInOrder> {
        return app.get('db').getRepository(ProductInOrder).findOne({
            where: {
                id: id
            }
        });
    }

    /**
     * Return user by username
     * @param app Express application
     * @param username Product username
     * @returns Promise<User>
     */
    public static getProductByName(app: Application, name: string): Promise<ProductInOrder[]> {
        return app.get('db').getRepository(ProductInOrder).findOne({
            where: {
                name: name
            }
        });
    }

    /**
     * Return user by category
     * @param app Express application
     * @param username Product username
     * @returns Promise<User>
     */
    public static getProductByCategory(app: Application, category: string): Promise<ProductInOrder[]> {
        return app.get('db').getRepository(ProductInOrder).findOne({
            where: {
                category: category
            }
        });
    }

    /**
     * Delete user by id
     * @param app Express application
     * @param id User id
     * @returns Promise<DeleteResult>
     */
    public static deleteProduct(app: Application, id: string): Promise<DeleteResult> {
        return app.get('db').getRepository(ProductInOrder).delete({id: id});
    }

    /**
     * Add new user
     * @param app Express application
     * @param user User object
     * @returns Promise<User>
     */
    public static addProduct(app: Application, product: ProductInOrder): Promise<ProductInOrder> {
        return app.get('db').getRepository(ProductInOrder).save(product);
    }

    /**
     * Update user by id
     * @param app Express application
     * @param id User id
     * @param user User object
     * @returns Promise<UpdateResult>
     */
    public static updateProduct(app: Application, id: string, product: ProductInOrder): Promise<UpdateResult> {
        return app.get('db').getRepository(ProductInOrder).update({id: id}, product);
    }

    /**
     * Update shipping price
     * @param app 
     * @param id 
     * @param shippingPrice 
     * @returns 
     */
    public static updateShippingPrice(app: Application, id: string, shippingPrice: number): Promise<UpdateResult> {
        return app.get('db').getRepository(ProductInOrder).updateOne({ id: id }, { $inc: { shippingPrice: shippingPrice } });
    }

}