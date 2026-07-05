/**
 * User service.
 *
 * Responsibilities:
 * - Handle business logic.
 * - Interact with the database.
 */
import { User } from "../models/index.js";


class UserService {
    /**  
     * Create a new user
     */

    static async create (userData){
       const user= await User.create(userData)
       return user
    }
}

export default UserService