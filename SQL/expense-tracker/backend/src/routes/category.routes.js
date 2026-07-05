import express from "express";
import CategoryController from "../controllers/category.controller.js";

const router = express.Router();

/** POST /api/categories — Create a new category */
router.post("/", CategoryController.createCategory);

/** GET /api/categories — Get all categories */
router.get("/", CategoryController.getAllCategories);

/** GET /api/categories/:id — Get category by ID */
router.get("/:id", CategoryController.getCategoryById);

/** PUT /api/categories/:id — Update category by ID */
router.put("/:id", CategoryController.updateCategory);

/** DELETE /api/categories/:id — Delete category by ID */
router.delete("/:id", CategoryController.deleteCategory);

export default router;
