/**
 * User controller.
 *
 * Responsibilities:
 * - Handle HTTP requests.
 * - Call the service layer.
 * - Return HTTP responses.
 */

import UserService from "../services/user.service.js";

class UserController {
    /**
     * Create a new user.
     */
    static async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);

            return res.status(201).json({
                success: true,
                message: "User created successfully.",
                data: user,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default UserController;