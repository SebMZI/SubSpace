import express from "express";
import swaggerUi from 'swagger-ui-express';
import AUTH_ROUTER from "../routes/auth.route";
import TAGS_ROUTER from "../routes/tag.route";
import CONTENT_ROUTER from "../routes/content.route";
import swagger from "../swagger";

const API_ROUTES = express.Router();

API_ROUTES.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger))
API_ROUTES.use("/auth", AUTH_ROUTER);
API_ROUTES.use("/tags", TAGS_ROUTER);
API_ROUTES.use("/contents", CONTENT_ROUTER);

export default API_ROUTES;