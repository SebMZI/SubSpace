import "./config/env.config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {rateLimit} from "express-rate-limit";
import {connectDatabase} from "./config/db.config";
import "./models/associations";
import API_ROUTES from "./routes/api.routes";

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
APP.use("/api/v1", API_ROUTES);

APP.use((req: any, res: any)=> {
    res.status(404).send("Not Found");
})
// SERVER
APP.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}/api/v1`);
    await connectDatabase();
});