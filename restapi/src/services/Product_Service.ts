import { DeleteResult, ObjectID, UpdateResult } from 'typeorm';
import { Application } from 'express';
import { Product } from '../entities/Product';

export class ProductService {

    /**
     * Return all users
     * @param app Express application
     * @returns Promise<User[]>
     */
    public static getProducts(app: Application): Promise<Product[]> {
        return app.get('db').getRepository(Product).find();
    }

    /**
     * Return user by id
     * @param app Express application
     * @param id Product id
     * @returns Promise<User>
     */
    public static getProductById(app: Application, id: string): Promise<Product> {
        return app.get('db').getRepository(Product).findOne({
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
    public static getProductByName(app: Application, name: string): Promise<Product> {
        return app.get('db').getRepository(Product).findOne({
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
    public static getProductByCategory(app: Application, category: string): Promise<Product[]> {
        return app.get('db').getRepository(Product).findOne({
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
        return app.get('db').getRepository(Product).delete({id: id});
    }

    /**
     * Add new user
     * @param app Express application
     * @param user User object
     * @returns Promise<User>
     */
    public static addProduct(app: Application, product: Product): Promise<Product> {
        return app.get('db').getRepository(Product).save(product);
    }

    /**
     * Update user by id
     * @param app Express application
     * @param id User id
     * @param user User object
     * @returns Promise<UpdateResult>
     */
    public static updateProduct(app: Application, id: string, product: Product): Promise<UpdateResult> {
        return app.get('db').getRepository(Product).update({id: id}, product);
    }

}