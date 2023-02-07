export const ApiEnvSchema = {
    type: "object",
    required: [],
    properties: {
        HOST: {
            type: "string",
            default: "localhost",
        },
        PORT: {
            type: "number",
            default: 3000,
        },
        NODE_ENV: {
            enum: ["development", "production", "test"],
            default: "development",
        },
        DB_HOST: {
            type: "string",
            default: "localhost",
        },
        DB_PORT: {
            type: "number",
            default: 5432,
        },
        DB_USER: {
            type: "string",
            default: "postgres",
        },
        DB_PASSWORD: {
            type: "string",
            default: "docker",
        },
        DB_NAME: {
            type: "string",
            default: "reptracker-db",
        },
    },
};
