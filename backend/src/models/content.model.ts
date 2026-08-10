import {SEQUELIZE} from "../config/db.config";
import {DataTypes} from "sequelize";

const Content = SEQUELIZE.define("Content", {
    contentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastUpdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    channelId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    subscriberCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "userId",
        }
    }
})

export default Content