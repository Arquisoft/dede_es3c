/**
 * REST API Routes with Express
 * @author: Sergio Arroni del Reigo - UO276341
 */
import express, { Router } from 'express';
import {check} from 'express-validator';
import { ProductController } from './controllers/Product_Controller';
import { UserController } from './controllers/User_Controller';
import { OrderController } from './controllers/Order_Controller';
import { Auth } from './middlewares/Auth_Middleware';
 
 // =================================> Constants
 const api: Router = express.Router(); // Express router
 const auth: Auth = new Auth(); // Auth middleware
 const userController: UserController = new UserController(); // User Routes Controller
 const productsController: ProductController = new ProductController(); // Products Routes Controller
 const ordersController: OrderController = new OrderController(); // Orders Routes Controller
 
 // =================================> Routes
 const setAuthRoutes = (): void => {
     api.route('/login')
         .post([
             check('username').isLength({min: 1}),
             check('password').isLength({min: 1}),
             check('email').isEmail().normalizeEmail()
         ], auth.login);
 };

  // =================================> Routes
  
  const setRegisterRoutes = (): void => {
    api.route('/register')
             // Create new user
        .post( [
            check('username').isLength({min: 1}),
            check('password').isLength({min: 1}),
            check('email').isEmail().normalizeEmail()
        ], auth.register);
};
 
 /**
  * Set User Routes for express App
  */
 const setUserRoutes = (): void => {
 
     api.route('/users')
         // Get all users
         .get(auth.isAdminAuth, userController.getUsers)
 
     api.route('/users/username/:username')
         .get(auth.isAuth, userController.getUserByUsername);

    api.route('/users/userpod/:username')
         .get(auth.isAuth, userController.findPod);
 
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
        .get(productsController.getProductByPartialName);
    
    api.route('/products/category/:category')
        .get(productsController.getProductByCategory);


    api.route('/products/:id')
        // Get products by id
        .get(productsController.getProductById)
        // Delete products by id
        .delete(auth.isAdminAuth,productsController.deleteProduct)
        // Update products by id
        .put(auth.isAdminAuth,productsController.updateProduct)
}

const setOrdersRoutes = (): void => {
 
    api.route('/orders')
        // Get all products
        .get(auth.isAuth, ordersController.getOrders)
        // Create new products
        .post(auth.isAuth, ordersController.addOrder);

    api.route('/orders/:id')
        // Get products by id
        .get(auth.isAuth, ordersController.getOrderById)
        // Delete products by id
        .delete(auth.isAdminAuth, ordersController.deleteOrder)
        // Update products by id
        .put(auth.isAdminAuth, ordersController.updateOrder)
}
 
 // =================================> Main
 setAuthRoutes();
 setUserRoutes();
 setProductsRoutes();
 setRegisterRoutes();
 setOrdersRoutes();
 
 export default api;