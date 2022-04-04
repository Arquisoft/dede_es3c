import { DeleteResult, UpdateResult } from "typeorm";
import { Application } from "express";
import { DistributionCenter } from "../entities/DistributionCenter";

export class DistributionCenterService {

    /**
     * Return all distribution centers
     * @param app Express application
     * @returns Promise<DistributionCenter[]>
     */
    public static getDistributionCenters(app: Application): Promise<DistributionCenter[]> {
        return app.get('db').getRepository(DistributionCenter).find();
    }

}