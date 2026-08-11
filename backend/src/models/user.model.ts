import {SEQUELIZE} from "../config/db.config";
import {DataTypes} from "sequelize";

const User = SEQUELIZE.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {timestamps: true})

export default User;