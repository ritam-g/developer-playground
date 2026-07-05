import express from "express";
import ReportController from "../controllers/report.controller.js";

const router = express.Router();

/**
 * GET /api/reports/summary
 * Dashboard summary: Total Income, Total Expense, Balance
 */
router.get("/summary", ReportController.getDashboardSummary);

/**
 * GET /api/reports/category-expense
 * Category-wise expense breakdown (GROUP BY categoryId)
 */
router.get("/category-expense", ReportController.getCategoryExpense);

/**
 * GET /api/reports/monthly-trends
 * Monthly income & expense for a given year (?year=2025)
 */
router.get("/monthly-trends", ReportController.getMonthlyTrends);

/**
 * GET /api/reports/recent
 * Most recent N transactions (?limit=5)
 */
router.get("/recent", ReportController.getRecentTransactions);

/**
 * GET /api/reports/highest-expense
 * Single highest expense transaction
 */
router.get("/highest-expense", ReportController.getHighestExpense);

/**
 * GET /api/reports/lowest-expense
 * Single lowest expense transaction
 */
router.get("/lowest-expense", ReportController.getLowestExpense);

/**
 * GET /api/reports/top-categories
 * Top N spending categories (?limit=5)
 */
router.get("/top-categories", ReportController.getTopSpendingCategories);

export default router;
