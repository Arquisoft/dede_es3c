import { DeleteResult, UpdateResult } from "typeorm";
import { Application } from "express";
import { Product } from "../entities/Product";

const escapeStringRegexp = require('escape-string-regexp');

export class DistributionCenterService {
  /**
   * Return all products
   * @param app Express application
   * @returns Promise<Product[]>
   */
  public static getDistributionCenters(app: Application): Promise<Product[]> {
    return app.get("db").getRepository(Product).find();
  }


}