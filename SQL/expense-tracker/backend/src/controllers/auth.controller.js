/**
 * Authentication controller.
 *
 * Responsibilities:
 * - Handle /register and /login HTTP requests.
 * - Delegate logic to AuthService.
 * - Return formatted JSON responses.
 */
import AuthService from "../services/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";

class AuthController {
    /**
     * Register a new user.
     *
     * POST /api/auth/register
     * Body: { name, email, password }
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async register(req, res) {
        try {
            const user = await AuthService.register(req.body);
            return ApiResponse.success(res, 201, "User registered successfully.", user);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }

    /**
     * Login an existing user.
     *
     * POST /api/auth/login
     * Body: { email, password }
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async login(req, res) {
        try {
            const result = await AuthService.login(req.body);
            return ApiResponse.success(res, 200, "Login successful.", result);
        } catch (error) {
            return ApiResponse.error(res, 401, error.message);
        }
    }
}

export default AuthController;
