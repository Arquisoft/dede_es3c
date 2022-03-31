import { Request, Response } from 'express';
import { UserService } from '../services/User_Service';
import { User } from '../entities/User';
import { DeleteResult } from 'typeorm';
import * as crypto from 'crypto';
import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
  } from "@inrupt/solid-client";
  
import { VCARD } from "@inrupt/vocab-common-rdf";
import { UserPOD } from '../entities/UserPOD';


export class UserController {

    /**
     * Get all users
     * @param req Request
     * @param res Response
     * @returns All users with status 200 or error 500
     */
    public async getUsers(req: Request, res: Response) {
        try {
            res.status(200).json(await UserService.getUsers(req.app));
        } catch (error) {
            res.status(500).json({ error: "Error on get all users" });
        }
    }

    /**
     * Get user by id
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async getUserById(req: Request, res: Response) {
        try {
            const user = await UserService.getUserById(req.app, String(req.params.id));
            user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get user by id" })
        }
    }

    /**
     * Get user by username
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async getUserByUsername(req: Request, res: Response) {
        try {
            const user = await UserService.getUserByUsername(req.app, req.params.username);
            user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get user by username: " + error })
        }
    }

    /**
     * Update user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async updateUser(req: Request, res: Response) {
        try {
            let salt = crypto.randomBytes(16).toString("hex");
            let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
            let userBody = new User(req.body.username, req.body.email,salt, hash, req.body.rol );
            const user = await UserService.updateUser(req.app, String(req.params.id), userBody);
            user ? res.status(200).json(user.raw) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on update user: " + error })
        }
    }

    /**
     * Delete user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async deleteUser(req: Request, res: Response) {
        try {
            const user: DeleteResult = await UserService.deleteUser(req.app, String(req.params.id));
            user ? res.status(200).json(user.raw) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ delete: false, error: "Error on delete user: " + error})
        }
    }

    /**
     * Find user SOLID POD
     * @param req Request
     * @param res Response
     * @returns Address with status 200 or error 500
     */
    public async findPod(req: Request, res: Response) {

            const username = req.params.username;
        
            try {
                const SOLIDDataset = await getSolidDataset(
                    "https://" + username  + ".inrupt.net/profile/card", {
                    fetch: fetch
                });
                const Userprofile = getThing(SOLIDDataset, "https://" + username + ".inrupt.net/profile/card#me")
                const addressUserWebID = Userprofile!.predicates["http://www.w3.org/2006/vcard/ns#hasAddress"]["namedNodes"]
                const idUserPodAddress = addressUserWebID![0].split('#')[1]
                let userAddress = {} as UserPOD;

                
                if (idUserPodAddress == null){
                    res.status(500).json({error: "Error, address could not be found"});
                }
        
                const getUserSOLIDAddress = getThing(SOLIDDataset, "https://" + username + ".inrupt.net/profile/card#" + idUserPodAddress);

                const postal_code = getStringNoLocale(getUserSOLIDAddress!, VCARD.postal_code);
                userAddress.postal_code = String(postal_code);
        
                const country_name = getStringNoLocale(getUserSOLIDAddress!, VCARD.country_name);
                userAddress.country_name = String(country_name);

                const locality = getStringNoLocale(getUserSOLIDAddress!, VCARD.locality);
                userAddress.locality = String(locality);
        
                const street_address = getStringNoLocale(getUserSOLIDAddress!, VCARD.street_address);
                userAddress.street_address = String(street_address);

                const region = getStringNoLocale(getUserSOLIDAddress!, VCARD.region);
                userAddress.region = String(region);
                
                if(country_name || region || locality || street_address || postal_code){
                    res.status(200).json({ result: userAddress });
                }else{
                    res.status(500).json({error: "Error, one of the address fields is null and does not exist"})
                }

            } catch (error) {
                res.status(500).json({ error: "Error on find user POD by username: " + error})
            }
    }

    /**
     * Create user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async addUser(req: Request, res: Response) {
        try {
            let salt = crypto.randomBytes(16).toString("hex");
            let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
            let userBody = new User(req.body.username, req.body.email, salt, hash, req.body.rol );
            const user = await UserService.addUser(req.app, userBody);
            user ? res.status(200).json(user) : res.status(500).json({ error: "Error add user" });
        } catch (error) {
            res.status(500).json({ error: "Error add user: " + error})
        }
    }

}