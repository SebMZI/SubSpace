import {SEQUELIZE} from "../config/db.config";
import {DataTypes} from "sequelize";

const Tag = SEQUELIZE.define("Tag", {
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrementIdentity: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default Tag;