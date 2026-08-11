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

/**
 * @swagger
 * /tags:
 *   get:
 *     tags:
 *       - Tags
 *     summary: Get all tags linked to user
 *     description: Get all tags linked to user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tags
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to get all tags
 */
TAGS_ROUTER.get("/", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, TAGS_CONTROLLER.getTags.bind(TAGS_CONTROLLER));

/**
 * @swagger
 * /tags:
 *   post:
 *     tags:
 *       - Tags
 *     summary: Create a tag
 *     description: Create a tag
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag successfully created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to add tag
 */
TAGS_ROUTER.post("/", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, TAGS_CONTROLLER.addTag.bind(TAGS_CONTROLLER));

/**
 * @swagger
 * /tags/{:id}:
 *   put:
 *     tags:
 *       - Tags
 *     summary: Edit a tag
 *     description: Edit a tag
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Tag Id to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag successfully updated
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to edit tag
 */
TAGS_ROUTER.put("/:id", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, TAGS_CONTROLLER.editTag.bind(TAGS_CONTROLLER));

/**
 * @swagger
 * /tags/{:id}:
 *   delete:
 *     tags:
 *       - Tags
 *     summary: Delete a tag
 *     description: Delete a tag
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Tag Id to delete
 *     responses:
 *       200:
 *         description: Tag successfully deleted
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to delete tag
 */
TAGS_ROUTER.delete("/:id", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, TAGS_CONTROLLER.deleteTag.bind(TAGS_CONTROLLER));

export default TAGS_ROUTER;