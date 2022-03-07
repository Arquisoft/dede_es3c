import * as crypto from 'crypto';
import { Request, Response } from 'express';
import { DeleteResult, ObjectID } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductService } from '../services/Product_Service';


export class ProductController {

    /**
     * Get all users
     * @param req Request
     * @param res Response
     * @returns All users with status 200 or error 500
     */
    public async getProducts(req: Request, res: Response) {
        try {
            res.status(200).json(await ProductService.getProducts(req.app));
        } catch (error) {
            res.status(500).json({ error: "Error on get all Products" });
        }
    }

    /**
     * Get user by id
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async getProductById(req: Request, res: Response) {
        try {
            const user = await ProductService.getProductById(req.app, String(req.params.id));
            user ? res.status(200).json(user) : res.status(404).json({ error: "Product not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get Product by id" })
        }
    }

    /**
     * Get user by username
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async getProductByName(req: Request, res: Response) {
        try {
            const product = await ProductService.getProductByName(req.app, req.params.name);
            product ? res.status(200).json(product) : res.status(404).json({ error: "Product not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get Product by name: " + error })
        }
    }

    /**
     * Get user by category
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
         public async getProductByCategory(req: Request, res: Response) {
            try {
                const product = await ProductService.getProductByCategory(req.app, req.params.category);
                product ? res.status(200).json(product) : res.status(404).json({ error: "Product not found" });
            } catch (error) {
                res.status(500).json({ error: "Error on get Product by category: " + error })
            }
        }

    /**
     * Update user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async updateProduct(req: Request, res: Response) {
        try {
            let productServiceBody = new Product(req.body.name, req.body.description,req.body.price,req.body.category);
            const product = await ProductService.updateProduct(req.app, String(req.params.id), productServiceBody);
            product ? res.status(200).json(product.raw) : res.status(404).json({ error: "Product not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on update Product: " + error })
        }
    }

    /**
     * Delete user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async deleteProduct(req: Request, res: Response) {
        try {
            const product: DeleteResult = await ProductService.deleteProduct(req.app, String(req.params.id));
            product ? res.status(200).json(product.raw) : res.status(404).json({ error: "Product not found" });
        } catch (error) {
            res.status(500).json({ delete: false, error: "Error on delete Product: " + error})
        }
    }

    /**
     * Create user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async addProduct(req: Request, res: Response) {
        try {
            let productBody = new Product(req.body.name, req.body.description, req.body.price, req.body.category);
            const product = await ProductService.addProduct(req.app, productBody);
            product ? res.status(200).json(product) : res.status(500).json({ error: "Error add Product" });
        } catch (error) {
            res.status(500).json({ error: "Error add Product: " + error})
        }
    }

}