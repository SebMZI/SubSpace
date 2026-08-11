import "./config/env.config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {rateLimit} from "express-rate-limit";
import {connectDatabase} from "./config/db.config";
import "./models/associations";
import AUTH_ROUTER from "./routes/auth.route";
import TAGS_ROUTER from "./routes/tag.route";
import CONTENT_ROUTER from "./routes/content.route";

const APP = express();
const PORT = process.env.PORT || 3000;

const GLOBAL_LIMITER = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

APP.use(cors());
APP.use(helmet());
APP.use(GLOBAL_LIMITER);
APP.use(express.json());

// ROUTES
APP.use("/auth", AUTH_ROUTER);
APP.use("/tags", TAGS_ROUTER);
APP.use("/contents", CONTENT_ROUTER);
APP.use((req: any, res: any)=> {
    res.status(404).send("Not Found");
})
// SERVER
APP.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDatabase();
});