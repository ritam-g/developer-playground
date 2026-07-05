/**
 * User routes.
 *
 * Responsibilities:
 * - Define user API endpoints.
 * - Forward requests to the user controller.
 */

import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

/**
 * Create user route.
 *
 * POST /api/users
 */
router.post("/", UserController.createUser);

/**
 * Get all users route.
 *
 * GET /api/users
 */
router.get("/", UserController.getAllUsers);

/**
 * Get user by ID route.
 *
 * GET /api/users/:id
 */
router.get("/:id", UserController.getUserById);

/**
 * Update user by ID route.
 *
 * PUT /api/users/:id
 */
router.put("/:id", UserController.updateUser);

/**
 * Delete user by ID route.
 *
 * DELETE /api/users/:id
 */
router.delete("/:id", UserController.deleteUser);

export default router;
