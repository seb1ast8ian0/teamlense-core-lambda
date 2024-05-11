import { Client } from "pg";

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "postgres",
    user: process.env.DB_USERNAME || "test-user",
    password: process.env.DB_PASSWORD || "test-password",
    port: parseInt(process.env.DB_PORT || "5432")
};

export const postgres_client = new Client(dbConfig);

let isClientConnected = false;

const connectToDatabase = async () => {
    try {
        if (!isClientConnected) {
            await postgres_client.connect();
            isClientConnected = true;
            console.log("Connected to PostgreSQL database");
        }
    } catch (error) {
        console.error("Error connecting to PostgreSQL database:", error);
    }
}

connectToDatabase();

const cleanup = async () => {
    try {
        await postgres_client.end();
        console.log("Disconnected from PostgreSQL database");
    } catch (error) {
        console.error("Error disconnecting from PostgreSQL database:", error);
    }
};

process.on('exit', () => cleanup());
process.on('SIGINT', async () => {
    console.log('Received SIGINT signal (CTRL+C)');
    await cleanup();
    process.exit(0);
});