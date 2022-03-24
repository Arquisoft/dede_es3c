import { DeleteResult, UpdateResult } from "typeorm";
import { Application } from "express";
import { Product } from "../entities/Product";

const reg = function escapeRegExp(text:string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class ProductService {
  /**
   * Return all products
   * @param app Express application
   * @returns Promise<Product[]>
   */
  public static getProducts(app: Application): Promise<Product[]> {
    return app.get("db").getRepository(Product).find();
  }

  /**
   * Return product by id
   * @param app Express application
   * @param id Product id
   * @returns Promise<Product>
   */
  public static getProductById(app: Application, id: string): Promise<Product> {
    return app
      .get("db")
      .getRepository(Product)
      .findOne({
        where: {
          id: id,
        },
      });
  }

  /**
   * Return product by name
   * @param app Express application
   * @param name Product name
   * @returns Promise<Product>
   */
  public static getProductByName(
    app: Application,
    name: string
  ): Promise<Product[]> {
    return app
      .get("db")
      .getRepository(Product)
      .find({
        where: {
          name: name,
        },
      });
  }

  /**
   * Return product by name
   * @param app Express application
   * @param name Product name
   * @returns Promise<Product>
   */
     public static getProductByPartialName(
      app: Application,
      name: string
    ): Promise<Product[]> {
      return app
        .get("db")
        .getRepository(Product)
        .find({
          where: {
            name: RegExp(reg(name), "gi") ,
          },
        });
    }

  /**
   * Return product by category
   * @param app Express application
   * @param category Product category
   * @returns Promise<Product>
   */
  public static getProductByCategory(
    app: Application,
    category: string
  ): Promise<Product[]> {
    return app
      .get("db")
      .getRepository(Product)
      .find({
        where: {
          category: category,
        },
      });
  }

  /**
   * Delete product by id
   * @param app Express application
   * @param id Product id
   * @returns Promise<DeleteResult>
   */
  public static deleteProduct(
    app: Application,
    id: string
  ): Promise<DeleteResult> {
    return app.get("db").getRepository(Product).delete({ id: id });
  }

  /**
   * Add new product
   * @param app Express application
   * @param product Product object
   * @returns Promise<Product>
   */
  public static addProduct(
    app: Application,
    product: Product
  ): Promise<Product> {
    return app.get("db").getRepository(Product).save(product);
  }

  /**
   * Update product by id
   * @param app Express application
   * @param id Product id
   * @param product Product object
   * @returns Promise<UpdateResult>
   */
  public static updateProduct(
    app: Application,
    id: string,
    product: Product
  ): Promise<UpdateResult> {
    return app.get("db").getRepository(Product).update({ id: id }, product);
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
    stock: number
  ): Promise<UpdateResult> {
    return app
      .get("db")
      .getRepository(Product)
      .updateOne({ id: id }, { $inc: { stock: -stock } });
  }

  /**
   * Update stock product by id
   * @param app Express application
   * @param id Product id
   * @param product Product object
   * @returns Promise<UpdateResult>
   */
  public static increaseProductStock(
    app: Application,
    id: string,
    stock: number
  ): Promise<UpdateResult> {
    return app
      .get("db")
      .getRepository(Product)
      .updateOne({ id: id }, { $inc: { stock: stock } });
  }
}
