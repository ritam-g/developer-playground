import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user account
 */
router.post("/register", AuthController.register);

/**
 * POST /api/auth/login
 * Login and receive a JWT token
 */
router.post("/login", AuthController.login);

export default router;
