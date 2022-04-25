import { User } from '../entities/User';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Application } from 'express';

export class UserService {

    /**
     * Return all users
     * @param app Express application
     * @returns Promise<User[]>
     */
    public static getUsers(app: Application): Promise<User[]> {
        return app.get('db').getRepository(User).find();
    }

    /**
     * Return user by id
     * @param app Express application
     * @param id User id
     * @returns Promise<User>
     */
    public static getUserById(app: Application, id: string): Promise<User> {
        return app.get('db').getRepository(User).findOne({
            where: {
                id: id
            }
        });
    }

    /**
     * Return user by username
     * @param app Express application
     * @param username User username
     * @returns Promise<User>
     */
    public static getUserByUsername(app: Application, username: string): Promise<User> {
        return app.get('db').getRepository(User).findOne({
            where: {
                username: username
            }
        });
    }

    /**
     * Return user by email
     * @param app Express application
     * @param email User email
     * @returns Promise<User>
     */
     public static getUserByEmail(app: Application, email: string): Promise<User> {
        return app.get('db').getRepository(User).findOne({
            where: {
                email: email
            }
        });
    }

    /**
     * Delete user by id
     * @param app Express application
     * @param id User id
     * @returns Promise<DeleteResult>
     */
    public static deleteUser(app: Application, id: string): Promise<DeleteResult> {
        return app.get('db').getRepository(User).delete({id: id});
    }

    /**
     * Add new user
     * @param app Express application
     * @param user User object
     * @returns Promise<User>
     */
    public static addUser(app: Application, user: User): Promise<User> {
        return app.get('db').getRepository(User).save(user);
    }

    /**
     * Update user by id
     * @param app Express application
     * @param id User id
     * @param user User object
     * @returns Promise<UpdateResult>
     */
    public static updateUser(app: Application, id: string, user: User): Promise<UpdateResult> {
        return app.get('db').getRepository(User).update({id: id}, user);
    }

}