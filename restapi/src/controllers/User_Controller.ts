import { Request, Response } from 'express';
import { UserService } from '../services/User_Service';
import { User } from '../entities/User';
import { DeleteResult } from 'typeorm';


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
            let userBody = new User(req.body.username, req.body.email, req.body.password, req.body.rol );
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
     * Create user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async addUser(req: Request, res: Response) {
        try {
            let userBody = new User(req.body.username, req.body.email,req.body.password, req.body.rol );
            const user = await UserService.addUser(req.app, userBody);
            user ? res.status(200).json(user) : res.status(500).json({ error: "Error add user" });
        } catch (error) {
            res.status(500).json({ error: "Error add user: " + error})
        }
    }

}