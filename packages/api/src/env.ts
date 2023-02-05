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
    },
};
