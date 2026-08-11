import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {AuthService} from "../services/auth.service";
import cors from "cors";
import helmet from "helmet";
import {rateLimit} from "express-rate-limit";
const AUTH_ROUTER = express.Router();

const AUTH_SERVICE = new AuthService()
const AUTH_CONTROLLER = new AuthController(AUTH_SERVICE);

const LIMITER = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 20
})

AUTH_ROUTER.post("/signin", LIMITER, AUTH_CONTROLLER.signin.bind(AUTH_CONTROLLER));
AUTH_ROUTER.post("/signup", LIMITER, AUTH_CONTROLLER.signup.bind(AUTH_CONTROLLER));

export default AUTH_ROUTER;