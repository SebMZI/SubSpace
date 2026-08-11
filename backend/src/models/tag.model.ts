import {SEQUELIZE} from "../config/db.config";
import {DataTypes} from "sequelize";

const Tag = SEQUELIZE.define("Tag", {
    tagId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "userId",
        }
    }
}, {timestamps: true})

export default Tag;