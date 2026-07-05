/**
 * API Response Utility.
 *
 * Responsibilities:
 * - Send standard success responses.
 * - Send standard error responses.
 */

class ApiResponse {
    /**
     * Send a success response.
     *
     * @param {Object} res - Express response object.
     * @param {number} statusCode - HTTP status code.
     * @param {string} message - Success message.
     * @param {*} data - Response data.
     * @returns {Object} Express JSON response.
     */
    static success(res, statusCode, message, data = null) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    /**
     * Send an error response.
     *
     * @param {Object} res - Express response object.
     * @param {number} statusCode - HTTP status code.
     * @param {string} message - Error message.
     * @returns {Object} Express JSON response.
     */
    static error(res, statusCode, message) {
        return res.status(statusCode).json({
            success: false,
            message,
        });
    }
}

export default ApiResponse;
