/**
 * Database configuration.
 *
 * Responsibilities:
 * - Create the Sequelize instance.
 * - Support both local and production databases.
 * - Export the Sequelize instance.
 */

import { Sequelize } from "sequelize";
import config from "./env.js";

let sequelize;

if (config.database.url) {
    /**
     * Production
     */
    sequelize = new Sequelize(config.database.url, {
        dialect: "mysql",
        logging: false,
    });
} else {
    /**
     * Local Development
     */
    sequelize = new Sequelize(
        config.database.name,
        config.database.user,
        config.database.password,
        {
            host: config.database.host,
            port: config.database.port,
            dialect: "mysql",
            logging: false,
        }
    );
}

export default sequelize;