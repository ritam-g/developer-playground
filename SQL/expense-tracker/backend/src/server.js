import app from "./app.js";
import config from "./config/env.js";
import sequelize from "./config/database.js";

/**
 * Import all models.
 * This also executes the association definitions.
 */
import "./models/index.js";

/**
 * Start the application.
 */
const startServer = async () => {
    try {
        /**
         * Test database connection.
         */
        await sequelize.authenticate();

        console.log("✅ Database connected successfully.");

        /**
         * Synchronize all models with the database.
         */
        await sequelize.sync()

        console.log("✅ Database synchronized successfully.");

        /**
         * Start Express server.
         */
        app.listen(config.app.port, () => {
            console.log(`🚀 Server running on http://localhost:${config.app.port}`);
        });



    } catch (error) {
         console.error("❌ Application failed to start.");
        console.error(error);

        process.exit(1);
    }
};

startServer();