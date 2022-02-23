/**
 * REST API Routes with Express
 * @author: Sergio Arroni del Reigo - UO276341
 */
 import express, { Router } from 'express';
 import {check} from 'express-validator';
 import { UserController } from './controllers/User_Controller';
 import { Auth } from './middlewares/Auth_Middleware';
 
 // =================================> Constants
 const api: Router = express.Router(); // Express router
 const auth: Auth = new Auth(); // Auth middleware
 const userController: UserController = new UserController(); // User Routes Controller
 
 // =================================> Routes
 const setAuthRoutes = (): void => {
     api.route('/login')
         .post([
             check('username').isLength({min: 1}),
             check('password').isLength({min: 1}),
             check('email').isEmail().normalizeEmail()
         ], auth.login);
     api.route('/register')
         .post([
             check('username').isLength({min: 1}),
             check('password').isLength({min: 1}),
             check('email').isEmail().normalizeEmail()
         ], userController.addUser);
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
         .delete(auth.isAuth, userController.deleteUser)
         // Update user by id
         .put(auth.isAuth, userController.updateUser)
 }
 
 // =================================> Main
 setAuthRoutes();
 setUserRoutes();

 
 export default api;