/**
 * REST API Routes with Express
 * @author: Sergio Arroni del Reigo - UO276341
 */
 import express, { Router } from 'express';
 import {check} from 'express-validator';
 import { ProductController } from './controllers/Product_Controller';
 import { UserController } from './controllers/User_Controller';
 import { OrderController } from './controllers/Order_Controller';
 import { DistributionCenterController } from './controllers/DistributionCenter_Controller';
 import { ProductStoreController } from './controllers/ProductStore_Controller';
 import { Auth } from './middlewares/Auth_Middleware';
  
  // =================================> Constants
  const api: Router = express.Router(); // Express router
  const auth: Auth = new Auth(); // Auth middleware
  const userController: UserController = new UserController(); // User Routes Controller
  const productsController: ProductController = new ProductController(); // Products Routes Controller
  const ordersController: OrderController = new OrderController(); // Orders Routes Controller
  const distributioncentersController: DistributionCenterController = new DistributionCenterController(); // Distribution centers Routes Controller
  const productstoreController: ProductStoreController = new ProductStoreController();
  
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
         .get(userController.getUsers)
 
    api.route('/users/username/:username')
         .get(userController.getUserByUsername);

    api.route('/users/userpod/:username')
         .get(userController.findPod);

    // Update user by id
    api.route('/users/email/:email/name/:name')
        .put(auth.isAuth, userController.updateUserByEmailName)

    // Update user by id
    api.route('/users/email/:email/password/:password')
        .put(auth.isAuth, userController.updateUserByEmailPassword)
 
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

    api.route('/products/namepartial/:name')
        .get(productsController.getProductByPartialName);

    api.route('/products/name/:name')
        .get(productsController.getProductByName);
    
    api.route('/products/name/:name/:category')
        .get(productsController.getProductByCategoryException);
    
    api.route('/products/category/:category')
        .get(productsController.getProductByCategory);
        
    api.route('/products/price/:min/:max')
        .get(productsController.getProductByPrice);

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
        // Get all orders
        .get(auth.isAuth, ordersController.getOrders)
        // Create new orders
        .post(auth.isAuth, ordersController.addOrder);


    api.route('/orders/user/:email')
        // Get orders by user email
        .get(auth.isAuth, ordersController.getOrdersByUserEmail)

    api.route('/orders/shippingprice')
        .post(auth.isAuth, ordersController.calculateShippingPrice)

    api.route('/orders/:id')
        // Get orders by id
        .get(auth.isAuth, ordersController.getOrderById)
        // Delete orders by id
        .delete(auth.isAdminAuth, ordersController.deleteOrder)
        // Update orders by id
        .put(auth.isAdminAuth, ordersController.updateOrder)

}

const setDistributionCentersRoutes = (): void => {
 
    api.route('/distributioncenters')
        // Get all distribution centers
        .get(auth.isAuth, distributioncentersController.getDistributionCenters)
        // Create new orders
        .post(auth.isAdminAuth, distributioncentersController.addDistributionCenter);

    api.route('/distributioncenters/:productname/:quantity')
        // Get distribution centers by available product
        .get(auth.isAuth, distributioncentersController.getDistributionCentersByAvailableProduct)
    
}

const setProductStoreRoutes = (): void => {

    api.route('/productstore')
        // Create 
        .post(auth.isAdminAuth, productstoreController.addProductStore)
        // Delete
        .delete(auth.isAdminAuth,productstoreController.deleteProductStore)
        // Update 
        .put(auth.isAdminAuth,productstoreController.updateProductStore)

    api.route('/store/:productname')
        .get(productstoreController.getMaxStockByProduct)
        
    api.route('/store/:productname/:quantity')
        .get(auth.isAuth, productstoreController.canBuy)


}

  setAuthRoutes();
  setUserRoutes();
  setProductsRoutes();
  setRegisterRoutes();
  setOrdersRoutes();
  setDistributionCentersRoutes();
  setProductStoreRoutes();
  
  export default api;