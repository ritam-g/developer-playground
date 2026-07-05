/**
 * Transaction model.
 *
 * Represents the transactions table.
 */

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define(
    "Transaction",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        transactionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "transactions",
        timestamps: true,
    }
);

export default Transaction;