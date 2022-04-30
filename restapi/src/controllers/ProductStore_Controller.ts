import { Request, Response } from 'express';
import { ProductService } from '../services/Product_Service';
import { ProductStoreService } from '../services/ProductStore_Service';


export class ProductStoreController {

    /**
     * Get all users
     * @param req Request
     * @param res Response
     * @returns All users with status 200 or error 500
     */
     public async canBuy(req: Request, res: Response) {
        try {
            var productname = req.params.productname
            
            var product = await ProductService.getproductByName(req.app, productname);
            var productstore = await ProductStoreService.getMaxStockByProduct(req.app, product.id)
            var stock = 0
            stock = productstore
                ? productstore.stock
                : 0

            var quantity = Number.parseInt(req.params.quantity)
            if (stock>=quantity){
                res.status(200).json(true)
            } else {
                res.status(200).json(false)
            }
            
        } catch (error) {
            res.status(500).json({ error: "Error: no existe ningún producto con ese nombre" });
        }
    }

    /**
     * Get all users
     * @param req Request
     * @param res Response
     * @returns All users with status 200 or error 500
     */
    public async getMaxStockByProduct(req: Request, res: Response) {
        try {
            var productname = req.params.productname
            var product = await ProductService.getproductByName(req.app, productname);
            var productstore = await ProductStoreService.getMaxStockByProduct(req.app, product.id)
            var stock = 0
            stock = productstore
                ? productstore.stock
                : 0
            res.status(200).json(stock)
        } catch (error) {
            res.status(500).json({ error: "Error: no existe ningún producto con ese nombre" });
        }
    }

    

}