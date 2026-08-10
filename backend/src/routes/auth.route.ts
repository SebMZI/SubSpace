import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {AuthService} from "../services/auth.service";
const AUTH_ROUTER = express.Router();

const AUTH_SERVICE = new AuthService()
const AUTH_CONTROLLER = new AuthController(AUTH_SERVICE);

AUTH_ROUTER.post("/signin", AUTH_CONTROLLER.signin.bind(AUTH_CONTROLLER));
AUTH_ROUTER.post("/signup", AUTH_CONTROLLER.signup.bind(AUTH_CONTROLLER));

export default AUTH_ROUTER;