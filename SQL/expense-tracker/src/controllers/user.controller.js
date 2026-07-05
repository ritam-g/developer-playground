/**
 * User controller.
 *
 * Responsibilities:
 * - Handle HTTP requests.
 * - Call the service layer.
 * - Return HTTP responses.
 */

import UserService from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";


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

            return ApiResponse.success(res, 201, "User created successfully.", user);

        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
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

            return ApiResponse.success(res, 200, "Users fetched successfully.", users);

        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
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
                return ApiResponse.error(res, 404, "User not found.");
            }

            return ApiResponse.success(res, 200, "User fetched successfully.", user);

        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
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
                return ApiResponse.error(res, 404, "User not found.");
            }

            return ApiResponse.success(res, 200, "User updated successfully.", user);

        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
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
                return ApiResponse.error(res, 404, "User not found.");
            }

            return ApiResponse.success(res, 200, "User deleted successfully.", user);

        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
        }
    }
}

export default UserController;
