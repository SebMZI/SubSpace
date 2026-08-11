import "./config/env.config";
import express from "express";
import {connectDatabase} from "./config/db.config";
import "./models/associations";
import AUTH_ROUTER from "./routes/auth.route";
import TAGS_ROUTER from "./routes/tag.route";
import CONTENT_ROUTER from "./routes/content.route";

const APP = express();
const PORT = process.env.PORT || 3000;

APP.use(express.json());

// ROUTES
APP.use("/auth", AUTH_ROUTER);
APP.use("/tags", TAGS_ROUTER);
APP.use("/contents", CONTENT_ROUTER);

// SERVER
APP.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDatabase();
});