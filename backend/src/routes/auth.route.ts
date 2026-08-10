import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {AuthService} from "../services/auth.service";
const AUTH_ROUTER = express.Router();

const authController = new AuthController(new AuthService());

AUTH_ROUTER.post("/signin", authController.signin);
AUTH_ROUTER.post("/signup", authController.signup);

export default AUTH_ROUTER;