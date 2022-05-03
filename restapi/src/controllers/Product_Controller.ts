import { Request, Response } from "express";
import { DeleteResult } from "typeorm";
import { Product } from "../entities/Product";
import { ProductService } from "../services/Product_Service";

export class ProductController {
  /**
   * Get all products
   * @param req Request
   * @param res Response
   * @returns All products with status 200 or error 500
   */
  public async getProducts(req: Request, res: Response) {
    try {
      res.status(200).json(await ProductService.getProducts(req.app));
    } catch (error) {
      res.status(500).json({ error: `Error on get all Products: ${error}` });
    }
  }

  /**
   * Get product by id
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async getProductById(req: Request, res: Response) {
    try {
      const product = await ProductService.getProductById(
        req.app,
        String(req.params.id)
      );
      product
        ? res.status(200).json(product)
        : res.status(404).json({ error: "Product not found" });
    } catch (error) {
      res.status(500).json({ error: "Error on get Product by id" });
    }
  }

  /**
   * Get product by name
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async getProductByName(req: Request, res: Response) {
    try {
      const product = await ProductService.getproductByName(
        req.app,
        req.params.name
      );
      product
        ? res.status(200).json(product)
        : res.status(404).json({ error: "Product not found" });
    } catch (error) {
      res.status(500).json({ error: "Error on get Product by name: " + error });
    }
  }

  /**
   * Get product by name
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async getProductByPartialName(req: Request, res: Response) {
    try {
      const product = await ProductService.getProductByPartialName(
        req.app,
        req.params.name
      );
      product
        ? res.status(200).json(product)
        : res.status(404).json({ error: "Product not found" });
    } catch (error) {
      res.status(500).json({ error: "Error on get Product by name: " + error });
    }
  }

  /**
   * Get product by category
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async getProductByCategory(req: Request, res: Response) {
    try {
      const product = await ProductService.getProductByCategory(
        req.app,
        req.params.category
      );
      product
        ? res.status(200).json(product)
        : res.status(404).json({ error: "Product not found" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error on get Product by category: " + error });
    }
  }

  /**
   * Get product by category without one product
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
     public async getProductByCategoryException(req: Request, res: Response) {
      try {
        const product = await ProductService.getProductByCategory(
          req.app,
          req.params.category
        );
        for(let i= 0 ;i<product.length;i++){
          if(product[i].name===(req.params.name)){
            product.splice(i,1);
            break;
          }
        }
        product
          ? res.status(200).json(product)
          : res.status(404).json({ error: "Product not found" });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error on get Product by category: " + error });
      }
    }

  /**
   * Get product by price
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async getProductByPrice(req: Request, res: Response) {
    try {

      if (+req.params.min > +req.params.max || +req.params.min < 0) {
        res.status(500).json({ error: "Error on get Product by price " });
      }

      const product = await ProductService.getProductByPrice(
        req.app,
        +req.params.min,
        +req.params.max
      );
      product
        ? res.status(200).json(product)
        : res.status(404).json({ error: "Product not found" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error on get Product by price: " + error });
    }
  }

  /**
   * Update product
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async updateProduct(req: Request, res: Response) {
    try {
      let productServiceBody = new Product(
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        req.body.urlPhoto
      );
      const product = await ProductService.updateProduct(
        req.app,
        String(req.params.id),
        productServiceBody
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
  public async deleteProduct(req: Request, res: Response) {
    try {
      const product: DeleteResult = await ProductService.deleteProduct(
        req.app,
        String(req.params.id)
      );
      product
        ? res.status(200).json(product.raw)
        : res.status(404).json({ error: "Product not found" });
    } catch (error) {
      res
        .status(500)
        .json({ delete: false, error: "Error on delete Product: " + error });
    }
  }

  /**
   * Create product
   * @param req Request
   * @param res Response
   * @returns product with status 200 or error 500
   */
  public async addProduct(req: Request, res: Response) {
    try {
      let productBody = new Product(
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        req.body.urlPhoto
      );
      const product = await ProductService.addProduct(req.app, productBody);
      product
        ? res.status(200).json(product)
        : res.status(500).json({ error: "Error add Product" });
    } catch (error) {
      res.status(500).json({ error: "Error add Product: " + error });
    }
  }
}