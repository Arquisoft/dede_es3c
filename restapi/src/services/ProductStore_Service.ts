import { DeleteResult, UpdateResult } from "typeorm";
import { Application } from 'express';
import { ProductStore } from '../entities/ProductStore';

export class ProductStoreService {

    /**
     * Return all users
     * @param app Express application
     * @returns Promise<User[]>
     */
    public static getProductStores(app: Application): Promise<ProductStore[]> {
        return app.get('db').getRepository(ProductStore).find();
    }

    /**
     * Return user by id
     * @param app Express application
     * @param id Product id
     * @returns Promise<User>
     */
     public static getProductStoresByProduct(app: Application, product_id: string): Promise<ProductStore[]> {
        return app.get('db').getRepository(ProductStore).find({
            where: {
                product_id: product_id
            }
        });
    }

    /**
     * Return user by id
     * @param app Express application
     * @param id Product id
     * @returns Promise<User>
     */
    public static getProductStoresByProductAndDC(app: Application, product_id: string, distributioncenter_id: string): Promise<ProductStore> {
        return app.get('db').getRepository(ProductStore).findOne({
            where: {
                product_id: product_id,
                distributioncenter_id: distributioncenter_id
            }
        });
    }

    /**
     * Return all distribution centers
     * @param app Express application
     * @returns Promise<DistributionCenter[]>
     */
   public static getMaxStockByProduct(app: Application, productid: string): Promise<ProductStore> {
    return app.get('db').getRepository(ProductStore)
        .findOne({
            where: { product_id: productid },
            order: { stock: "DESC" },
            take: 1
        });
}

   /**
   * Update stock product by id
   * @param app Express application
   * @param id Product id
   * @param product Product object
   * @returns Promise<UpdateResult>
   */
  public static decrementProductStock(app: Application,product_id: string,distributioncenter_id: string,stock: number)
    : Promise<UpdateResult> {
    return app
      .get("db")
      .getRepository(ProductStore)
      .updateOne({ 
          product_id: product_id,
          distributioncenter_id: distributioncenter_id }, 
          { $inc: { stock: -stock } });
  }

  /**
   * Add new product store
   * @param app Express application
   * @param product ProductStore object
   * @returns Promise<ProductStore>
   */
   public static addProductStore(
    app: Application,
    product: ProductStore
  ): Promise<ProductStore> {
    return app.get("db").getRepository(ProductStore).save(product);
  }

  /**
   * Update product by id
   * @param app Express application
   * @param id Product id
   * @param product Product object
   * @returns Promise<UpdateResult>
   */
   public static updateProductStore(
    app: Application,
    product_id: string,
    distributioncenter_id: string,
    stock: number
  ): Promise<UpdateResult> {
    return app.get("db").getRepository(ProductStore).updateOne({ 
        product_id: product_id,
        distributioncenter_id: distributioncenter_id }, 
        { $set: {stock: stock } });
  }

  /**
   * Delete product by id
   * @param app Express application
   * @param id Product id
   * @returns Promise<DeleteResult>
   */
   public static deleteProductStore(
    app: Application,
    id: string
  ): Promise<DeleteResult> {
    return app.get("db").getRepository(ProductStore).delete({ id: id });
  }

    

}