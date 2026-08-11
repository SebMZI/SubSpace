import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {AuthService} from "../services/auth.service";
import {rateLimit} from "express-rate-limit";
const AUTH_ROUTER = express.Router();

const AUTH_SERVICE = new AuthService()
const AUTH_CONTROLLER = new AuthController(AUTH_SERVICE);

const LIMITER = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 20
})

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in to your account
 *     description: Authenticate a user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       500:
 *         description: Failed to signin, please try again in a few minutes.
 */
AUTH_ROUTER.post("/signin", LIMITER, AUTH_CONTROLLER.signin.bind(AUTH_CONTROLLER));

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new account
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *               firstName:
 *                 type: string
 *                 example: john
 *               lastName:
 *                 type: string
 *                 example: doe
 *     responses:
 *       201:
 *         description: Account successfully created
 *       500:
 *         description: Failed to signup, please try again in a few minutes.
 */
AUTH_ROUTER.post("/signup", LIMITER, AUTH_CONTROLLER.signup.bind(AUTH_CONTROLLER));

export default AUTH_ROUTER;