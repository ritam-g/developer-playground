/**
 * Category model.
 *
 * Represents the categories table.
 */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        type: {
            type: DataTypes.ENUM("income", "expense"),
            allowNull: false,
        },
    },
    {
        tableName: "categories",
        timestamps: true,
    }
);

export default Category;