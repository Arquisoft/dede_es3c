import { Request, Response } from 'express';
import { DeleteResult} from 'typeorm';
import { ProductInOrder } from '../entities/ProductInOrder';
import { ProductOrderService } from '../services/ProductOrder_Service';


export class ProductController {

    /**
     * Get all users
     * @param req Request
     * @param res Response
     * @returns All users with status 200 or error 500
     */
    public async getProducts(req: Request, res: Response) {
        try {
            res.status(200).json(await ProductOrderService.getProducts(req.app));
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
            const user = await ProductOrderService.getProductById(req.app, String(req.params.id));
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
            const product = await ProductOrderService.getProductByName(req.app, req.params.name);
            product ? res.status(200).json(product) : res.status(404).json({ error: "Product not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get Product by name: " + error })
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
            let productServiceBody = new ProductInOrder(req.body.product, req.body.quantity, req.body.distributionCenter);
            const product = await ProductOrderService.updateProduct(req.app, String(req.params.id), productServiceBody);
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
            const product: DeleteResult = await ProductOrderService.deleteProduct(req.app, String(req.params.id));
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
            let productBody = new ProductInOrder(req.body.product, req.body.quantity, req.body.distributionCenter);
            const product = await ProductOrderService.addProduct(req.app, productBody);
            product ? res.status(200).json(product) : res.status(500).json({ error: "Error add Product" });
        } catch (error) {
            res.status(500).json({ error: "Error add Product: " + error})
        }
    }

}