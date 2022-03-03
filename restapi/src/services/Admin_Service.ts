import { Admin } from '../entities/Admin';
import { DeleteResult, ObjectID, UpdateResult } from 'typeorm';
import { Application } from 'express';

export class AdminService {

    /**
     * Return all Admins
     * @param app Express application
     * @returns Promise<Admin[]>
     */
    public static getAdmins(app: Application): Promise<Admin[]> {
        return app.get('db').getRepository(Admin).find();
    }

    /**
     * Return Admin by id
     * @param app Express application
     * @param id Admin id
     * @returns Promise<Admin>
     */
    public static getAdminById(app: Application, id: string): Promise<Admin> {
        return app.get('db').getRepository(Admin).findOne({
            where: {
                id: id
            }
        });
    }

    /**
     * Return Admin by Adminname
     * @param app Express application
     * @param Adminname Admin Adminname
     * @returns Promise<Admin>
     */
    public static getAdminByAdminUsername(app: Application, username: string): Promise<Admin> {
        return app.get('db').getRepository(Admin).findOne({
            where: {
                username: username
            }
        });
    }

    /**
     * Delete Admin by id
     * @param app Express application
     * @param id Admin id
     * @returns Promise<DeleteResult>
     */
    public static deleteAdmin(app: Application, id: string): Promise<DeleteResult> {
        return app.get('db').getRepository(Admin).delete({id: id});
    }

    /**
     * Add new Admin
     * @param app Express application
     * @param Admin Admin object
     * @returns Promise<Admin>
     */
    public static addAdmin(app: Application, admin: Admin): Promise<Admin> {
        return app.get('db').getRepository(Admin).save(admin);
    }

    /**
     * Update Admin by id
     * @param app Express application
     * @param id Admin id
     * @param Admin Admin object
     * @returns Promise<UpdateResult>
     */
    public static updateAdmin(app: Application, id: string, admin: Admin): Promise<UpdateResult> {
        return app.get('db').getRepository(Admin).update(id, admin);
    }

}