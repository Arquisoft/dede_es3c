import { Request, Response } from 'express';
import { DistributionCenter } from '../entities/DistributionCenter';
import { DistributionCenterService } from '../services/DistributionCenter_Service';
import { ProductService } from '../services/Product_Service';

export class DistributionCenterController {

    /**
     * Get all DistributionCenters
     * @param req Request
     * @param res Response
     * @returns All DistributionCenters with status 200 or error 500
     */
    public async getDistributionCenters(req: Request, res: Response) {
        try {
            res.status(200).json(await DistributionCenterService.getDistributionCenters(req.app));
        } catch (error) {
            res.status(500).json({ error: "Error on get all DistributionCenters" });
        }
    }

    /**
     * 
     * @param req Request
     * @param res Response
     */
     public async getDistributionCentersByAvailableProduct(req: Request, res: Response) {
        try {
            var productname = req.params.productname
            var quantity = Number.parseInt(req.params.quantity)
            var listOfDistributionCentersIds:string[] = [];
            var distributionCenters: DistributionCenter[] = await DistributionCenterService.getDistributionCenters(req.app);
            for (var d of distributionCenters) {
                
                for (var store of d.store) {
                    if (store.product.name == productname && store.stock >= quantity) {
                        listOfDistributionCentersIds.push(d.id);
                    }
                }
            }
            res.status(200).json(await DistributionCenterService.getDistributionCentersByAvailableProduct(req.app, listOfDistributionCentersIds));
        } catch (error) {
            res.status(500).json({ error: "Error on get all DistributionCenters by available product" });
        }
    }

    /**
   * Create distribution center
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async addDistributionCenter(req: Request, res: Response) {
    try {
      let dcBody = new DistributionCenter(
        req.body.address,
        req.body.store
      );
      const dc = await DistributionCenterService.addDistributionCenter(req.app, dcBody);
      dc
        ? res.status(200).json(dc)
        : res.status(500).json({ error: "Error add Distribution Center" });
    } catch (error) {
      res.status(500).json({ error: "Error add Distribution Center: " + error });
    }
  }




}

