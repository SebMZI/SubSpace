import "./config/env.config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {rateLimit, RateLimitRequestHandler} from "express-rate-limit";
import {connectDatabase} from "./config/db.config";
import "./models/associations";
import API_ROUTES from "./routes/api.routes";

export class App {
    app: express.Application;
    port: number = Number(process.env.PORT) || 3000;

    constructor() {
        this.app = express();
    }

    async initialize() {
        this.setDefaultMiddlewares();
        this.setRateLimit();
        this.setRoutes();
        this.setNotFoundPath();
        await this.startServer();
    }

    private setRateLimit(): RateLimitRequestHandler {
        return rateLimit({
            windowMs: 10 * 60 * 1000,
            limit: 300,
            standardHeaders: "draft-8",
            legacyHeaders: false,
        });
    }

    private setDefaultMiddlewares() {
        const RATE_LIMIT = this.setRateLimit();

        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(RATE_LIMIT);
        this.app.use(express.json());
    }

    private setRoutes() {
        this.app.use("/api/v1", API_ROUTES);
    }

    private setNotFoundPath() {
        this.app.use((req: any, res: any)=> {
            res.status(404).send("Not Found");
        })
    }

    private async startServer() {
        this.app.listen(this.port, async () => {
            console.log(`Server is running on http://localhost:${this.port}/api/v1`);
            await connectDatabase();
        });
    }
}