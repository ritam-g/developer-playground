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
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response with the created user.
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

    /**
     * Get all users.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response with a user array.
     */
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();

            return res.status(200).json({
                success: true,
                data: users,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    /**
     * Get user by ID.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response with one user or a 404 message.
     */
    static async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }

            return res.status(200).json({
                success: true,
                data: user,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    /**
     * Update user by ID.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response with the updated user or a 404 message.
     */
    static async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User updated successfully.",
                data: user,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    /**
     * Delete user by ID.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response with the deleted user or a 404 message.
     */
    static async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUser(req.params.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User deleted successfully.",
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
