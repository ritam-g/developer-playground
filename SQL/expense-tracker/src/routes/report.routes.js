import express from "express";
import ReportController from "../controllers/report.controller.js";

const router = express.Router();

/**
 * Route: GET /api/reports/summary
 * Get dashboard summary (Income, Expense, Balance)
 */
router.get("/summary", ReportController.getDashboardSummary);

export default router;
