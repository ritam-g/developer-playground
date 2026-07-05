/**
 * Report controller.
 *
 * Responsibilities:
 * - Extract query parameters.
 * - Call Report Service.
 * - Format JSON responses.
 */
import ReportService from "../services/report.service.js";
import ApiResponse from "../utils/apiResponse.js";

class ReportController {
    /**
     * Get Dashboard Summary (Total Income, Total Expense, Balance).
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     */
    static async getDashboardSummary(req, res) {
        try {
            // Note: Since we don't have Authentication middleware yet, 
            // we temporarily accept userId from the query string (e.g. ?userId=1).
            // In a production app, we would get this from req.user.id securely.
            const { userId } = req.query;

            const summary = await ReportService.getDashboardSummary(userId);

            return ApiResponse.success(res, 200, "Dashboard summary fetched successfully.", summary);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }
}

export default ReportController;
