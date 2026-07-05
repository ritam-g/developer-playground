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
     * Create a new user.
     *
     * SQL equivalent:
     * INSERT INTO users (...) VALUES (...);
     *
     * @param {object} userData - User data received from the controller.
     * @returns {Promise<User>} The newly created user instance.
     */
    static async createUser(userData) {
        const user = await User.create(userData);
        return user;
    }

    /**
     * Get all users.
     *
     * SQL equivalent:
     * SELECT * FROM users;
     *
     * @returns {Promise<User[]>} A list of user instances.
     */
    static async getAllUsers() {
        const users = await User.findAll();
        return users;
    }

    /**
     * Get user by ID.
     *
     * SQL equivalent:
     * SELECT * FROM users WHERE id = ?;
     *
     * @param {number|string} id - Primary key value from the route params.
     * @returns {Promise<User|null>} The matching user instance, or null.
     */
    static async getUserById(id) {
        const user = await User.findByPk(id);
        return user;
    }

    /**
     * Update user by ID.
     *
     * SQL equivalent:
     * UPDATE users SET ... WHERE id = ?;
     *
     * @param {number|string} id - Primary key value from the route params.
     * @param {object} userData - New user data received from the controller.
     * @returns {Promise<User|null>} The updated user instance, or null.
     */
    static async updateUser(id, userData) {
        const user = await User.findByPk(id);

        if (!user) {
            return null;
        }

        await user.update(userData);
        return user;
    }

    /**
     * Delete user by ID.
     *
     * SQL equivalent:
     * DELETE FROM users WHERE id = ?;
     *
     * @param {number|string} id - Primary key value from the route params.
     * @returns {Promise<User|null>} The deleted user instance, or null.
     */
    static async deleteUser(id) {
        const user = await User.findByPk(id);

        if (!user) {
            return null;
        }

        await user.destroy();

        return user;
    }
}

export default UserService;
