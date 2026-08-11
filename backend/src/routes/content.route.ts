import express from "express";
import {ContentService} from "../services/content.service";
import {ContentController} from "../controllers/content.controller";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {UserMiddleware} from "../middlewares/user.middleware";

const CONTENT_ROUTER = express.Router();
const CONTENT_SERVICE = new ContentService();
const CONTENT_CONTROLLER = new ContentController(CONTENT_SERVICE);
const AUTH_MIDDLEWARE = new AuthMiddleware();
const USER_MIDDLEWARE = new UserMiddleware();

CONTENT_ROUTER.get("/", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, CONTENT_CONTROLLER.getAllContents.bind(CONTENT_CONTROLLER));
CONTENT_ROUTER.post("/", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, CONTENT_CONTROLLER.addContent.bind(CONTENT_CONTROLLER));
CONTENT_ROUTER.put("/:id", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, CONTENT_CONTROLLER.editContent.bind(CONTENT_CONTROLLER));
CONTENT_ROUTER.delete("/:id", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, CONTENT_CONTROLLER.deleteContent.bind(CONTENT_CONTROLLER));

export default CONTENT_ROUTER;