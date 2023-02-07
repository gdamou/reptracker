import type { FastifyInstance } from "fastify";

import app from "./app";

const start = async () => {
    const server: FastifyInstance = await app({
        logger: {
            transport: {
                target: "pino-pretty",
                options: {
                    translateTime: "HH:MM:ss Z",
                    ignore: "pid,hostname",
                },
            },
        },
    });
    try {
        const host = server.config.HOST;
        const port = server.config.PORT;
        await server.listen({ host, port });
    } catch (error) {
        server.log.error(error);
    }
};

void start();
