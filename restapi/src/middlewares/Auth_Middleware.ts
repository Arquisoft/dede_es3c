import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserService } from '../services/User_Service';
import * as crypto from 'crypto';
import { UserController } from '../controllers/User_Controller';
import { User } from '../entities/User';
// Constants
const secret: string = process.env.SECRET_TOKEN || 'secret';
const signOpts = {
    expiresIn: "24h"
};
const userController: UserController = new UserController(); // User Routes Controller
export class Auth {

    /**
     * Login user and return token
     * @param req Request
     * @param res Response
     * @returns Token with status 200, error 500 or error 403 if user not found or password is incorrect
     */
    public async login(req: Request, res: Response) {
        try {
            const user = await UserService.getUserByUsername(req.app , req.body.username);
            if(user){
                const hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`).toString(`hex`);
                hash == user.hash ? 
                    res.status(200).json(Auth.createToken(user.username, user.rol)) :
                    res.status(403).json({error: "Error, la contraseña no coincide"});
            } else res.status(402).json({error: "El usuario no existe"});
        } catch (error) {
            res.status(500).json({ error: "Error al intentar iniciar sesion" });
        }
    }

    /**
     * Register user and return token
     * @param req Request
     * @param res Response
     * @returns Token with status 200, error 500 or error 403 if user not found or password is incorrect
     */
    public async register(req: Request, res: Response) {
            try {
                const userLogin = await UserService.getUserByUsername(req.app , req.body.username);
                if(userLogin){
                    res.status(402).json({error: "El usuario ya existe"});
                }else{
                    let salt = crypto.randomBytes(16).toString("hex");
                    let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
                    let userBody = new User(req.body.username, req.body.email, salt, hash, req.body.rol );
                    const user = await UserService.addUser(req.app, userBody);
                    res.status(200).json(Auth.createToken(user.username, user.rol));
                }
            } catch (error) {
                res.status(500).json({ error: "Error al intentar registrarse" });
            }
    }

    /**
     * Is Authenticated Middleware
     * @param req Request
     * @param res Response
     * @param next Next function
     * @returns next function if user is authenticated or error 403
     */
    public isAuth(req: Request, res: Response, next: () => void) {
        try {
            jwt.verify(`${req.headers.authorization}`, secret, function(err) {
                if(err){
                    res.status(403).send("Invalid authorization: "+err);
                }else{
                    next();
                }
            });
        } catch (err) {
            res.status(403).send("Invalid authorization: "+err);
        }
    }

        /**
     * Is Authenticated Middleware for Admin
     * @param req Request
     * @param res Response
     * @param next Next function
     * @returns next function if user is authenticated or error 403
     */
         public isAdminAuth(req: Request, res: Response, next: () => void) {
            try {
                jwt.verify(`${req.headers.authorization}`, secret, function(err, decoded) {
                    if(err || (decoded as jwt.JwtPayload).rol != "Admin"){
                        res.status(403).send("Invalid authorization: "+err);
                    }else{
                        next();
                    }
                });
            } catch (err) {
                res.status(403).send("Invalid authorization: "+err);
            }
        }

    /**
     * Create token with username payload
     * @param username Username
     * @param rol Rol Username
     * @returns string Token
     */
    public static createToken(username: string, rol: string): string{
        const payload = {
            name: username,
            rol: rol
        }
        return jwt.sign(payload, secret, signOpts);
    }

}