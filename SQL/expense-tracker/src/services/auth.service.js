/**
 * Authentication service.
 *
 * Responsibilities:
 * - Register new users (hash password, create user).
 * - Authenticate existing users (verify password, sign JWT).
 */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

class AuthService {
    /**
     * Register a new user.
     *
     * Process:
     * 1. Check if the email is already taken.
     * 2. Hash the plaintext password using bcrypt.
     * 3. Create the user in the database.
     * 4. Return user without password.
     *
     * @param {object} data - { name, email, password }
     * @returns {Promise<object>} Created user (without password).
     */
    static async register(data) {
        const { name, email, password } = data;

        // 1. Check if email is already registered
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            throw new Error("Email is already registered.");
        }

        // 2. Hash the password
        // bcrypt.hash(plaintext, saltRounds)
        // saltRounds = 10 means bcrypt runs 2^10 = 1024 hashing iterations.
        // This makes brute-force attacks extremely slow.
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user with hashed password (NEVER store plaintext passwords)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 4. Return a clean object without the hashed password
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };
    }

    /**
     * Login an existing user.
     *
     * Process:
     * 1. Find user by email.
     * 2. Compare submitted password with the stored hash.
     * 3. Generate a JWT access token.
     * 4. Return token and user info.
     *
     * @param {object} data - { email, password }
     * @returns {Promise<object>} { token, user }
     */
    static async login(data) {
        const { email, password } = data;

        // 1. Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // Important: Never say "Email not found" — that leaks info to attackers.
            // Always say "Invalid credentials" to prevent user enumeration attacks.
            throw new Error("Invalid email or password.");
        }

        // 2. Compare plaintext password against stored hash
        // bcrypt.compare() re-hashes the submitted password with the same salt
        // and checks if it matches the stored hash.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password.");
        }

        // 3. Sign a JWT token
        // jwt.sign(payload, secret, options)
        // The payload is embedded inside the token. Do NOT put sensitive data here.
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // 4. Return token and user (without password)
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
}

export default AuthService;
