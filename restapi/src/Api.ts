/**
 * REST API Routes with Express
 * @author: Sergio Arroni del Reigo - UO276341
 */
 import express, { Router } from 'express';
 import {check} from 'express-validator';
 import { ProductController } from './controllers/Product_Controller';
 import { UserController } from './controllers/User_Controller';
 import { OrderController } from './controllers/Order_Controller';
 import { ProductOrderController } from './controllers/ProductOrder_Controller';
 import { Auth } from './middlewares/Auth_Middleware';
  
  // =================================> Constants
  const api: Router = express.Router(); // Express router
  const auth: Auth = new Auth(); // Auth middleware
  const userController: UserController = new UserController(); // User Routes Controller
  const productsController: ProductController = new ProductController(); // Products Routes Controller
  const ordersController: OrderController = new OrderController(); // Orders Routes Controller
  const productordersController: ProductOrderController = new ProductOrderController();
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
         .get(auth.isAdminAuth,userController.getUsers)
 
     api.route('/users/username/:username')
         .get(userController.getUserByUsername);

    api.route('/users/userpod/:username')
         .get(userController.findPod);
 
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

const setOrdersRoutes = (): void => {
 
    api.route('/orders')
        // Get all orders
        .get(auth.isAuth, ordersController.getOrders)
        // Create new orders
        .post(auth.isAuth, ordersController.addOrder);


    api.route('/orders/user/:email')
        // Get orders by user email
        .get(auth.isAuth, ordersController.getOrdersByUserEmail)
    
    api.route('/orders/:id')
        // Get orders by id
        .get(auth.isAuth, ordersController.getOrderById)
        // Delete orders by id
        .delete(auth.isAdminAuth, ordersController.deleteOrder)
        // Update orders by id
        .put(auth.isAdminAuth, ordersController.updateOrder)

    
}

const setProductOrdersRoutes = (): void => {
 
    api.route('/productorders')
        // Get all orders
        .get(/*auth.isAuth,*/ productordersController.getProducts)
        // Create new orders
        //.post(auth.isAuth, productordersController.addProductOrder);

}

  setAuthRoutes();
  setUserRoutes();
  setProductsRoutes();
  setRegisterRoutes();
  setOrdersRoutes();
  setProductOrdersRoutes();
  
  export default api;