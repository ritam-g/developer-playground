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
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async createCategory(req, res) {
        try {
            const category = await CategoryService.createCategory(req.body);
            return ApiResponse.success(res, 201, "Category created successfully.", category);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }

    /**
     * Get all categories.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getAllCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            return ApiResponse.success(res, 200, "Categories fetched successfully.", categories);
        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
        }
    }

    /**
     * Get category by ID.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getCategoryById(req, res) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            if (!category) {
                return ApiResponse.error(res, 404, "Category not found.");
            }
            return ApiResponse.success(res, 200, "Category fetched successfully.", category);
        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
        }
    }

    /**
     * Update category by ID.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async updateCategory(req, res) {
        try {
            const category = await CategoryService.updateCategory(req.params.id, req.body);
            return ApiResponse.success(res, 200, "Category updated successfully.", category);
        } catch (error) {
            const status = error.message.includes("not found") ? 404 : 400;
            return ApiResponse.error(res, status, error.message);
        }
    }

    /**
     * Delete category by ID.
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async deleteCategory(req, res) {
        try {
            await CategoryService.deleteCategory(req.params.id);
            return ApiResponse.success(res, 200, "Category deleted successfully.");
        } catch (error) {
            const status = error.message.includes("not found") ? 404 : 500;
            return ApiResponse.error(res, status, error.message);
        }
    }
}

export default CategoryController;
