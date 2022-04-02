import { Request, Response } from "express";
import { DeleteResult } from "typeorm";
import { DistributionCenter } from "../entities/DistributionCenter";
import { DistributionCenterService } from "../services/DistributionCenter_Service";

export class DistributionCenterController {
  /**
   * Get all products
   * @param req Request
   * @param res Response
   * @returns All products with status 200 or error 500
   */
  public async getDistributionCenters(req: Request, res: Response) {
    try {
      res.status(200).json(await DistributionCenterService.getDistributionCenters(req.app));
    } catch (error) {
      res.status(500).json({ error: "Error on get all Products" });
    }
  }

 
}
