import fastifyEnv from "@fastify/env";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { MikroORM } from "@mikro-orm/postgresql";
import type { FastifyInstance, FastifyServerOptions } from "fastify";
import fastify from "fastify";

import { ApiEnvSchema } from "./env";
import config from "./mikro-orm.config";

declare module "fastify" {
    type FastifyInstance = {
        config: {
            HOST: string;
            PORT: number;
        };
    };
}

const app = async (options: FastifyServerOptions = {}): Promise<FastifyInstance> => {
    const app = fastify(options);

    await app.register(fastifyEnv, {
        confKey: "config",
        dotenv: true,
        schema: ApiEnvSchema,
    });

    const orm = await MikroORM.init<PostgreSqlDriver>(config);
    console.log(orm.em);
    //   app.register(router, { prefix: '/api' });

    return app;
};

export default app;
