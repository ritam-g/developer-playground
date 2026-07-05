/**
 * Category service.
 *
 * Responsibilities:
 * - Handle business logic for Categories.
 * - Interact with the database.
 */
import { Category } from "../models/index.js";


class CategoryService {
    /**
     * Create a new category.
     *
     * SQL equivalent:
     * INSERT INTO categories (name, type) VALUES (?, ?);
     *
     * @param {object} categoryData - Category data received from the controller.
     * @returns {Promise<Category>} The newly created category instance.
     */
    static async createCategory(categoryData) {
        const category = await Category.create(categoryData);
        return category;
    }
}

export default CategoryService;
