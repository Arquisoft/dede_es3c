/**
 * REST API Routes with Express
 * @author: Sergio Arroni del Reigo - UO276341
 */
 import express, { Router } from 'express';
 import {check} from 'express-validator';
import { ProductController } from './controllers/Product_Controller';
 import { UserController } from './controllers/User_Controller';
 import { Auth } from './middlewares/Auth_Middleware';
 
 // =================================> Constants
 const api: Router = express.Router(); // Express router
 const auth: Auth = new Auth(); // Auth middleware
 const userController: UserController = new UserController(); // User Routes Controller
 const productsController: ProductController = new ProductController(); // Products Routes Controller
 
 // =================================> Routes
 const setAuthRoutes = (): void => {
     api.route('/login')
         .post([
             check('username').isLength({min: 1}),
             check('password').isLength({min: 1}),
             //check('email').isEmail().normalizeEmail()
         ], auth.login);
 };
 
 /**
  * Set User Routes for express App
  */
 const setUserRoutes = (): void => {
 
     api.route('/users')
         // Get all users
         .get(userController.getUsers)
         // Create new user
         .post([
             check('username').isLength({ min: 1 }).trim().escape(),
             check('email').isEmail().normalizeEmail()
         ], userController.addUser);
 
     api.route('/users/username/:username')
         .get(userController.getUserByUsername);
 
     api.route('/users/:id')
         // Get user by id
         .get(userController.getUserById)
         // Delete user by id
         .delete(auth.isAdminAuth, userController.deleteUser)
         // Update user by id
         .put(auth.isAdminAuth, userController.updateUser)
 }

 const setProductsRoutes = (): void => {
 
    api.route('/products')
        // Get all products
        .get(productsController.getProducts)
        // Create new products
        .post(auth.isAdminAuth,[
            check('name').isLength({ min: 1 }).trim().escape()
        ], productsController.addProduct);

    api.route('/products/name/:name')
        .get(productsController.getProductByName);

    api.route('/products/:id')
        // Get products by id
        .get(productsController.getProductById)
        // Delete products by id
        .delete(auth.isAuth, productsController.deleteProduct)
        // Update products by id
        .put(auth.isAuth, productsController.updateProduct)
}
 
 // =================================> Main
 setAuthRoutes();
 setUserRoutes();
 setProductsRoutes();

 
 export default api;