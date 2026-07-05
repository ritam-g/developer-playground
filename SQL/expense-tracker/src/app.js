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
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
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
app.use(morgan("dev"));

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
app.use("/api/categories", categoryRoutes);

export default app;