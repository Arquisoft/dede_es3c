import * as crypto from 'crypto';
import { Request, Response } from 'express';
import { DeleteResult, ObjectID } from 'typeorm';
import { AdminService } from '../services/Admin_Service';
import { Admin } from '../entities/Admin';


export class AdminController {

    /**
     * Get all Admins
     * @param req Request
     * @param res Response
     * @returns All Admins with status 200 or error 500
     */
    public async getAdmins(req: Request, res: Response) {
        try {
            res.status(200).json(await AdminService.getAdmins(req.app));
        } catch (error) {
            res.status(500).json({ error: "Error on get all Admins" });
        }
    }

    /**
     * Get Admin by id
     * @param req Request
     * @param res Response
     * @returns Admin with status 200 or error 500
     */
    public async getAdminById(req: Request, res: Response) {
        try {
            const admin = await AdminService.getAdminById(req.app, String(req.params.id));
            admin ? res.status(200).json(admin) : res.status(404).json({ error: "Admin not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get Admin by id" })
        }
    }

    /**
     * Get Admin by Adminname
     * @param req Request
     * @param res Response
     * @returns Admin with status 200 or error 500
     */
    public async getAdminByAdminUsername(req: Request, res: Response) {
        try {
            const admin = await AdminService.getAdminByAdminUsername(req.app, req.params.username);
            admin ? res.status(200).json(admin) : res.status(404).json({ error: "Admin not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get Admin by Adminname: " + error })
        }
    }

    /**
     * Update Admin
     * @param req Request
     * @param res Response
     * @returns Admin with status 200 or error 500
     */
    public async updateAdmin(req: Request, res: Response) {
        try {
            let adminServiceBody = new Admin(req.body.username, req.body.email, req.body.password);
            const admin = await AdminService.updateAdmin(req.app, String(req.params.id), adminServiceBody);
            admin ? res.status(200).json(admin.raw) : res.status(404).json({ error: "Admin not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on update Admin: " + error })
        }
    }

    /**
     * Delete Admin
     * @param req Request
     * @param res Response
     * @returns Admin with status 200 or error 500
     */
    public async deleteAdmin(req: Request, res: Response) {
        try {
            const admin: DeleteResult = await AdminService.deleteAdmin(req.app, String(req.params.id));
            admin ? res.status(200).json(admin.raw) : res.status(404).json({ error: "Admin not found" });
        } catch (error) {
            res.status(500).json({ delete: false, error: "Error on delete Admin: " + error})
        }
    }

    /**
     * Create Admin
     * @param req Request
     * @param res Response
     * @returns Admin with status 200 or error 500
     */
    public async addAdmin(req: Request, res: Response) {
        try {
            let Admin_Body = new Admin(req.body.username, req.body.email, req.body.password);
            const admin = await AdminService.addAdmin(req.app, Admin_Body);
            admin ? res.status(200).json(admin) : res.status(500).json({ error: "Error add Admin" });
        } catch (error) {
            res.status(500).json({ error: "Error add Admin: " + error})
        }
    }

}