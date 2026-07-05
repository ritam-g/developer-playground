/**
 * Main Express application configuration.
 *
 * Responsibilities:
 * - Create the Express application.
 * - Register global middlewares.
 * - Register application routes (public + protected).
 *
 * Note:
 * This file DOES NOT start the server.
 * Server startup lives in server.js.
 */

import express from "express";
import morgan from "morgan";

// ── Routes ──────────────────────────────────────────────────
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import reportRoutes from "./routes/report.routes.js";

// ── Auth Middleware ──────────────────────────────────────────
import protect from "./middlewares/auth.middleware.js";

const app = express();

// ── Global Middlewares ───────────────────────────────────────
app.use(express.json());
app.use(morgan("dev"));

// ── Health Check ─────────────────────────────────────────────
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Expense Tracker API is Running 🚀",
    });
});

// ── Public Routes (No token needed) ─────────────────────────
// Auth: Register & Login
app.use("/api/auth", authRoutes);

// ── Protected Routes (JWT required) ──────────────────────────
// All routes below this line will require a valid JWT token.
// The protect middleware runs BEFORE the route handlers.
app.use("/api/users", protect, userRoutes);
app.use("/api/categories", protect, categoryRoutes);
app.use("/api/transactions", protect, transactionRoutes);
app.use("/api/reports", protect, reportRoutes);

export default app;