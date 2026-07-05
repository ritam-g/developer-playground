/**
 * Category controller.
 *
 * Responsibilities:
 * - Handle HTTP requests for categories.
 * - Call the service layer.
 * - Return HTTP responses.
 */

import CategoryService from "../services/category.service.js";
import ApiResponse from "../utils/apiResponse.js";

class CategoryController {
    /**
     * Create a new category.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response with the created category.
     */
    static async createCategory(req, res) {
        try {
            const category = await CategoryService.createCategory(req.body);

            return ApiResponse.success(res, 201, "Category created successfully.", category);

        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
        }
    }
}

export default CategoryController;
