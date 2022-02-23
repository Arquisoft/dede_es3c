import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserService } from '../services/User_Service';

// Constants
const secret: string = process.env.SECRET_TOKEN || 'secret';
const signOpts = {
    expiresIn: "24h"
};

export class Auth {

    /**
     * Login user and return token
     * @param req Request
     * @param res Response
     * @returns Token with status 200, error 500 or error 403 if user not found or password is incorrect
     */
    public async login(req: Request, res: Response) {
        try {
            const user = await UserService.getUserByUsername(req.app, req.body.username);
            if(user){
                res.status(200).json(Auth.createToken(user.username));
            } else res.status(404).json({error: "El usuario no existe"});
        } catch (error) {
            res.status(500).json({ error: "Error al intentar iniciar sesion" });
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
            jwt.verify(`${req.headers.authorization}`, secret, function(err, decoded) {
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
     * Create token with username payload
     * @param username Username
     * @returns string Token
     */
    public static createToken(username: string): string{
        const payload = {
            name: username
        }
        return jwt.sign(payload, secret, signOpts);
    }

}