import express from "express";
import {TagsController} from "../controllers/tags.controller";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {UserMiddleware} from "../middlewares/user.middleware";
import {TagsService} from "../services/tags.service";
const TAGS_ROUTER = express.Router();

const TAGS_SERVICE = new TagsService();
const TAGS_CONTROLLER = new TagsController(TAGS_SERVICE);
const AUTH_MIDDLEWARE = new AuthMiddleware();
const USER_MIDDLEWARE = new UserMiddleware();

TAGS_ROUTER.get("/", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, TAGS_CONTROLLER.getTags.bind(TAGS_CONTROLLER));
TAGS_ROUTER.post("/", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, TAGS_CONTROLLER.addTag.bind(TAGS_CONTROLLER));
TAGS_ROUTER.put("/:id", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, TAGS_CONTROLLER.editTag.bind(TAGS_CONTROLLER));
TAGS_ROUTER.delete("/:id", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, TAGS_CONTROLLER.deleteTag.bind(TAGS_CONTROLLER));

export default TAGS_ROUTER;