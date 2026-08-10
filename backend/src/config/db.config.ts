import {Sequelize} from "sequelize";

export const SEQUELIZE = new Sequelize(process.env.DB_PG_DATABASE || "", process.env.DB_PG_USERNAME || "", process.env.DB_PG_PASSWORD || "", {
    host: process.env.DB_PG_HOST || "localhost",
    dialect: "postgres",
});

export const connectDatabase = async () => {
    try {
        await SEQUELIZE.authenticate();
        console.log("Connection to database successful");
    }catch (e) {
        console.error("Unable to connect to database:", e);
    }
}