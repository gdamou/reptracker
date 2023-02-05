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
        const host: string = process.env.HOST ?? "localhost";
        const port: number = Number.parseInt(process.env.PORT ?? "3000");
        const address: string = await server.listen({ host, port });

        console.log(`Server running at ${address}`);
    } catch (error) {
        server.log.error(error);
    }
};

void start();
