import app from "./app.js";
import sequelize from "./config/database.js";
import config from "./config/env.js";

const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log('====================================');
        console.log("✅ Database connected successfully.");
        console.log('====================================');
        app.listen(config.app.port, () => {
            console.log(
                `🚀 Server is running on port ${config.app.port}`
            );
        });
    } catch (error) {
        console.error("❌ Failed to connect to the database.");
        console.error(error.message);
        process.exit(1);
    }
}

startServer()