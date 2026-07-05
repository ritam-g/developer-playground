/**
 * 
 * 
 * Main Express application configuration.
 *
 * Responsibilities:
 * - Create the Express application
 * - Register global middlewares
 * - Register application routes
 *
 * Note:
 * This file DOES NOT start the server.
 */

import express from "express";
import userRoutes from "./routes/user.routes.js";
const app = express();

/**
 * Parse incoming JSON request bodies.
 *
 * Example:
 * {
 *   "name": "Ritam"
 * }
 */
app.use(express.json());

/**
 * Health Check Route
 *
 * Used to verify that the server is running.
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Expense Tracker API is Running 🚀",
  });
});
/**
 * API Routes
 */
app.use("/api/users", userRoutes);

export default app;