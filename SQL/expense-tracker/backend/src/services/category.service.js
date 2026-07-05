/**
 * Category service.
 *
 * Responsibilities:
 * - Handle business logic for Categories.
 * - Interact with the database via Sequelize.
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

    /**
     * Get all categories.
     *
     * SQL equivalent:
     * SELECT * FROM categories;
     *
     * @returns {Promise<Category[]>}
     */
    static async getAllCategories() {
        return Category.findAll({ order: [["name", "ASC"]] });
    }

    /**
     * Get category by Primary Key.
     *
     * SQL equivalent:
     * SELECT * FROM categories WHERE id = ?;
     *
     * @param {number|string} id
     * @returns {Promise<Category|null>}
     */
    static async getCategoryById(id) {
        return Category.findByPk(id);
    }

    /**
     * Update category by ID.
     *
     * SQL equivalent:
     * UPDATE categories SET ... WHERE id = ?;
     *
     * @param {number|string} id
     * @param {object} data
     * @returns {Promise<Category>}
     */
    static async updateCategory(id, data) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error("Category not found.");
        await category.update(data);
        return category;
    }

    /**
     * Delete category by ID.
     *
     * SQL equivalent:
     * DELETE FROM categories WHERE id = ?;
     *
     * @param {number|string} id
     * @returns {Promise<Category>}
     */
    static async deleteCategory(id) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error("Category not found.");
        await category.destroy();
        return category;
    }
}

export default CategoryService;
