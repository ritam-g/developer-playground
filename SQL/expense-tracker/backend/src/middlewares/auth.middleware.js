/**
 * Authentication middleware.
 *
 * Responsibilities:
 * - Intercept every protected route.
 * - Verify the Bearer JWT token from the Authorization header.
 * - Attach the decoded user payload to req.user.
 * - Reject requests with missing or invalid tokens.
 */
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";

/**
 * Protect middleware.
 *
 * How JWT Authentication works:
 * 1. After login, the client stores the token (localStorage or cookie).
 * 2. For every protected request, the client sends the token in the header:
 *    Authorization: Bearer <token>
 * 3. This middleware extracts and verifies that token.
 * 4. If valid, req.user is set and the request continues.
 * 5. If invalid or missing, a 401 Unauthorized response is returned.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const protect = (req, res, next) => {
    // 1. Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return ApiResponse.error(res, 401, "Access denied. No token provided.");
    }

    // 2. Get the raw token string ("Bearer <token>" → "<token>")
    const token = authHeader.split(" ")[1];

    // 3. Verify the token using our secret key
    // jwt.verify() will throw an error if the token is expired or tampered with
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 4. Attach the decoded payload { id, email } to req.user
        req.user = decoded;
        next(); // Proceed to the route handler
    } catch (error) {
        return ApiResponse.error(res, 401, "Invalid or expired token.");
    }
};

export default protect;
