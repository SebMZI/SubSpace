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

/**
 * @swagger
 * /contents:
 *   get:
 *     tags:
 *       - Content
 *     summary: Get all content
 *     description: Get All content linked to a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User contents
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to get all contents
 */
CONTENT_ROUTER.get("/", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, CONTENT_CONTROLLER.getAllContents.bind(CONTENT_CONTROLLER));

/**
 * @swagger
 * /contents:
 *   post:
 *     tags:
 *       - Content
 *     summary: Add a new content
 *     description: Create a new content
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            required:
 *              - contentId
 *              - title
 *              - thumbnailUrl
 *            properties:
 *              contentId:
 *                type: integer
 *                example: 123
 *              title:
 *                type: string
 *                example: How to cook a steak for the dumb
 *              thumbnailUrl:
 *                type: string
 *                format: uri
 *                example: https://google.com
 *              description:
 *                type: string
 *                example: How to cook a steak for the dumb like me
 *              duration:
 *                type: integer
 *                example: 10
 *              channelId:
 *                type: integer
 *                example: 103949811
 *              subscriberCount:
 *                type: integer
 *                example: 103929292
 *              tags:
 *                type: array
 *                items:
 *                  type: integer
 *                  example: [1, 2]
 *     responses:
 *       200:
 *         description: User content
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to add content
 */
CONTENT_ROUTER.post("/", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, CONTENT_CONTROLLER.addContent.bind(CONTENT_CONTROLLER));

/**
 * @swagger
 * /contents/{:id}:
 *   put:
 *     tags:
 *       - Content
 *     summary: Edit a content
 *     description: Edit a content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Primary Content Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               thumbnailUrl:
 *                 type: string
 *               description:
 *                 type: string
 *               subscriberCount:
 *                 type: integer
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Content updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to edit content
 */
CONTENT_ROUTER.put("/:id", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, CONTENT_CONTROLLER.editContent.bind(CONTENT_CONTROLLER));

/**
 * @swagger
 * /contents/{:id}:
 *   delete:
 *     tags:
 *       - Content
 *     summary: Delete a content
 *     description: Delete a content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Content Id to delete
 *     responses:
 *       200:
 *         description: Content successfully deleted
 *       401:
 *         description: Unauthorized
 *       500:
 *        description: Failed to delete content
 */
CONTENT_ROUTER.delete("/:id", AUTH_MIDDLEWARE.verify, USER_MIDDLEWARE.verifyUser, CONTENT_CONTROLLER.deleteContent.bind(CONTENT_CONTROLLER));

export default CONTENT_ROUTER;