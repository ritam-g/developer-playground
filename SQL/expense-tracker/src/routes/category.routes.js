import express from "express";
import CategoryController from "../controllers/category.controller.js";

const router = express.Router();

/**
 * Route: POST /api/categories
 * Create a new category
 */
router.post("/", CategoryController.createCategory);

export default router;
