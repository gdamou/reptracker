import { join } from "node:path";

import { fastifyAutoload } from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import type { FastifyServerOptions } from "fastify";
import fastify from "fastify";

import { ApiEnvSchema } from "./env";
import { userRoutes } from "./routes/users";
import { MikroORM } from "@mikro-orm/postgresql";

declare module "fastify" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface FastifyInstance {
        config: {
            NODE_ENV: "development" | "production" | "test";
            HOST: string;
            PORT: number;
            DB_HOST: string;
            DB_PORT: number;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
        };
        orm: MikroORM
    }
}

const app = async (options: FastifyServerOptions = {}) => {
    const app = fastify(options);

    await app.register(fastifyEnv, {
        confKey: "config",
        dotenv: true,
        schema: ApiEnvSchema,
    });

    void app.register(fastifyAutoload, {
        // eslint-disable-next-line unicorn/prefer-module
        dir: join(__dirname, "plugins"),
    });
      app.register(userRoutes, { prefix: '/api' });

    return app;
};

export default app;
