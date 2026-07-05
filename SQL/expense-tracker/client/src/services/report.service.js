/** Report service — calls /api/reports/* endpoints */
import api from "../api/axios";

const ReportService = {
  getSummary: () => api.get("/reports/summary"),
  getCategoryExpense: () => api.get("/reports/category-expense"),
  getMonthlyTrends: (year) => api.get("/reports/monthly-trends", { params: { year } }),
  getRecent: (limit = 5) => api.get("/reports/recent", { params: { limit } }),
  getHighestExpense: () => api.get("/reports/highest-expense"),
  getLowestExpense: () => api.get("/reports/lowest-expense"),
  getTopCategories: (limit = 5) => api.get("/reports/top-categories", { params: { limit } }),
};

export default ReportService;
