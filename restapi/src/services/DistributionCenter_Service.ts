import { UpdateResult } from "typeorm";
import { Application } from "express";
import { DistributionCenter } from "../entities/DistributionCenter";
import { ProductStore } from "../entities/ProductStore";

export class DistributionCenterService {

    /**
     * Return all distribution centers
     * @param app Express application
     * @returns Promise<DistributionCenter[]>
     */
    public static getDistributionCenters(app: Application): Promise<DistributionCenter[]> {
        return app.get('db').getRepository(DistributionCenter).find();
    }

    /**
     * Return all distribution centers
     * @param app Express application
     * @returns Promise<DistributionCenter[]>
     */
     public static getDistributionCentersByAvailableProduct(app: Application, list: string[]): Promise<DistributionCenter[]> {
        return app.get('db').getRepository(DistributionCenter)
            .find({
                where: { id: { $in:list } }
            });
    }

     /**
   * Add new distribution center
   * @param app Express application
   * @param dc DistributionCenter object
   * @returns Promise<DistributionCenter>
   */
  public static addDistributionCenter(app: Application,dc: DistributionCenter): Promise<DistributionCenter> {
    return app.get("db").getRepository(DistributionCenter).save(dc);
  }

  /**
   * Update stock product by id
   * @param app Express application
   * @param id Product id
   * @param product Product object
   * @returns Promise<UpdateResult>
   */
   public static decrementProductStock(
    app: Application,
    id: string,
    store: ProductStore[]
  ): Promise<UpdateResult> {
    return app
      .get("db")
      .getRepository(DistributionCenter)
      .updateOne({ id: id }, 
        { $set: { store: store } }
        )
  }
  

}