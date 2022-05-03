import { Request, Response } from 'express';
import { ProductService } from '../services/Product_Service';
import { ProductStoreService } from '../services/ProductStore_Service';
import { ProductStore } from '../entities/ProductStore'
import { DeleteResult } from 'typeorm';


export class ProductStoreController {
    
    /**
     * Get all users
     * @param req Request
     * @param res Response
     * @returns All users with status 200 or error 500
     */
     public async addProductStore(req: Request, res: Response) {
        try {
            var product_id = req.body.productId
            var distributioncenter_id = req.body.distCenterID
            var stock = Number.parseInt(req.body.amount)
            
            let productstorebody = new ProductStore( distributioncenter_id, product_id, stock)
            const productstore = await ProductStoreService.addProductStore(req.app, productstorebody);

            productstore
                ? res.status(200).json(productstore)
                : res.status(500).json({ error: "Error add Product Store" });
        } catch (error) {
            res.status(500).json({ error: "Error: no existe ningún producto con ese nombre" });
        }
    }

    /**
   * Update product
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async updateProductStore(req: Request, res: Response) {
    try {
      let productId = req.body.productId
      let distCenterId = req.body.distCenterID
      
      const product = await ProductStoreService.updateProductStore(
        req.app,
        productId,
        distCenterId,
        Number.parseInt(req.body.amount)
      );
      product
        ? res.status(200).json(product.raw)
        : res.status(404).json({ error: "Product not found" });
    } catch (error) {
      res.status(500).json({ error: "Error on update Product: " + error });
    }
  }

  /**
   * Delete product
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async deleteProductStore(req: Request, res: Response) {
    try {
      let product = await ProductStoreService.getProductStoresByProductAndDC(req.app, req.body.productId, req.body.distCenterID)
      const productstore: DeleteResult = await ProductStoreService.deleteProductStore(
        req.app,
        product.id
      );
      productstore
        ? res.status(200).json(productstore.raw)
        : res.status(404).json({ error: "Product Store not found" });
    } catch (error) {
      res
        .status(500)
        .json({ delete: false, error: "Error on delete Product Store: " + error });
    }
  }

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