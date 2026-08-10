import "./config/env.config";
import express from "express";
import {connectDatabase} from "./config/db.config";
import "./models/associations";
import AUTH_ROUTER from "./routes/auth.route";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", AUTH_ROUTER)

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await connectDatabase();
});