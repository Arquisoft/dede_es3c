import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';
import { DistributionCenter } from '../entities/DistributionCenter';
import { ProductInOrder } from '../entities/ProductInOrder';
import { DistributionCenterService } from '../services/DistributionCenter_Service';

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
     * @param app 
     * @param product 
     * @returns 
     */
     public async getDistributionCentersByAvailableProduct(req: Request, res: Response) {
        try {
            var product = await new ProductInOrder(req.body.product, req.body.quantity, req.body.distributionCenter);
            var listOfDistributionCentersIds = [];
            for (var d of await DistributionCenterService.getDistributionCenters(req.app)) {
                var stock = d.store.get(product.product)
                if (stock != undefined) {
                    if (stock >= product.quantity) {
                        listOfDistributionCentersIds.push(d.id);
                    }
                }
            }
            res.status(200).json(await DistributionCenterService.getDistributionCentersByAvailableProduct(req.app, listOfDistributionCentersIds));
        } catch (error) {
            res.status(500).json({ error: "Error on get all DistributionCenters" });
        }
    }




}

